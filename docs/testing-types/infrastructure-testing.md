---
title: Infrastructure testing
layout: default
nav_order: 3
parent: Testing types
---

# Infrastructure testing

Infrastructure testing is concerned with testing the infrastructure-as-code (IaC) templates and configurations used to provision AWS resources and the provisioned resources as well. It ensures that **the infrastructure is correctly defined, provisioned, and configured** according to the desired state.
{: .fs-6 .fw-300 }

With the rise of Infrastructure as Code (IaC) practices, such as AWS CloudFormation, AWS CDK, and Terraform, testing becomes an essential component of the deployment pipeline. In this guide, we will explore the key concepts of infrastructure testing and its relevance within the AWS ecosystem.

## Infrastructure as Code

Infrastructure as Code (IaC) is a paradigm that enables the management and provisioning of infrastructure resources using **declarative templates or scripts**. AWS offers two primary IaC tools: AWS CloudFormation and AWS CDK.

### AWS CloudFormation

CloudFormation is a powerful Infrastructure-as-Code (IaC) service offered by AWS that allows you to define and provision AWS resources in a declarative manner. 

As an IaC tool, CloudFormation enables you to treat infrastructure as version-controlled code, bringing the benefits of reproducibility, scalability, and automation to your deployments. Its main features include a **JSON** or **YAML**-based template syntax, which describes the desired state of your infrastructure, automatic resource dependency management, and the ability to create, update, and delete stacks of resources as a single unit.

Take as example, one of our sample stack, the [static-site]({{ site.content.samples }}/static-site){:target="_blank"}.

The CloudFormation template (JSON) for the sample stack looks like the following:

```json
{
  "Resources": {
    "WebsiteBucket75C24D94": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "PublicAccessBlockConfiguration": {
          "BlockPublicAcls": true,
          "BlockPublicPolicy": true,
          "IgnorePublicAcls": true,
          "RestrictPublicBuckets": true
        }
      },
      "UpdateReplacePolicy": "Delete",
      "DeletionPolicy": "Delete"
    },
    "WebsiteBucketPolicyE10E3262": {
      "Type": "AWS::S3::BucketPolicy",
      "Properties": {
        "Bucket": {
          "Ref": "WebsiteBucket75C24D94"
        },
        "PolicyDocument": {}
      }
    },
    "WebsiteDistribution75DCDA0B": {
      "Type": "AWS::CloudFront::Distribution",
      "Properties": {
        "DistributionConfig": {
          "CustomErrorResponses": [
            {
              "ErrorCachingMinTTL": 1800,
              "ErrorCode": 403,
              "ResponseCode": 403,
              "ResponsePagePath": "/error.html"
            }
          ],
          "DefaultRootObject": "index.html",
          "Origins": [
            {
              "DomainName": {
                "Fn::GetAtt": [
                  "WebsiteBucket75C24D94",
                  "RegionalDomainName"
                ]
              },
              "Id": "StaticSiteStackWebsiteDistributionOrigin1EFF81211"
            }
          ]
        }
      }
    }
  },
  "Outputs": {
    "BucketName": {
      "Description": "The name of the S3 Bucket",
      "Value": {
        "Ref": "WebsiteBucket75C24D94"
      }
    },
    "DistributionId": {
      "Description": "The ID of the CloudFront distribution",
      "Value": {
        "Ref": "WebsiteDistribution75DCDA0B"
      }
    },
    "WebsiteUrl": {
      "Description": "The URL of the CloudFront distribution",
      "Value": {}
    }
  }
}
```

{: .note }
Note, that this is only a part of the synthetized JSON template and as it is now, not a valid and deployable CF JSON template.

In this example, the template defines
* an **S3 Bucket** for storage and hosting the static website, 
* a **CloudFront Distribution** to deliver the content of the website with low latency and high performance.

With CloudFormation, you can deploy this template, and AWS will automatically create the bucket, and the distribution with the specified configurations. You can also update the template and redeploy it, allowing for infrastructure changes to be managed in a controlled and consistent manner. 

### AWS CDK

AWS CDK (Cloud Development Kit) is another powerful Infrastructure-as-Code (IaC) tool provided by AWS.

Unlike CloudFormation, CDK allows you to define your infrastructure using familiar programming languages such as TypeScript, Python, Java, and more. This gives you the flexibility to leverage the expressiveness and modularity of programming languages while provisioning AWS resources. CDK simplifies the process of infrastructure provisioning by providing a higher-level object-oriented abstraction, enabling you to define and manage your infrastructure using constructs and stacks.

Here's the AWS CDK template of the sample stack used ([lib/static-site-stack.ts]({{ site.content.samples }}/static-site/lib/static-site-stack.ts){:target="_blank"}):

```typescript
// note, this is only a part of the CDK stack
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigin from 'aws-cdk-lib/aws-cloudfront-origins';

export class StaticSiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // ...

    new s3Deployment.BucketDeployment(this, 'WebsiteDeployment', {
      sources: [
        s3Deployment.Source.asset(path.join(__dirname, '..', 'site')),
      ],
      destinationBucket: bucket,
    });

    const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior:{
        origin: new cloudfrontOrigin.S3Origin(bucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: '/error.html',
          ttl: cdk.Duration.minutes(30),
        }
      ],
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: bucket.bucketName,
      description: 'The name of the S3 Bucket'
    });

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'The ID of the CloudFront distribution'
    });

    new cdk.CfnOutput(this, 'WebsiteUrl', {
      value: `https://${distribution.domainName}`,
      description: 'The URL of the CloudFront distribution'
    });
  }
}

```

By synthesizing and deploying this AWS CDK code, AWS will provision the specified bucket and distributionwith the defined configurations.

This is where the integration with CloudFormation comes into the picture. AWS CDK internally generates a CloudFormation template based on the CDK code. The synthesized CloudFormation template represents the desired state of the infrastructure defined in CDK.

When the CDK code is deployed, AWS CloudFormation uses the synthesized template to create and manage the AWS resources accordingly. CloudFormation takes care of resource provisioning, dependency management, and handles the orchestration of the deployment process. This ensures that the infrastructure defined using AWS CDK is accurately translated into the appropriate AWS resource configurations.

{: .important }
In the pages of this documentation, we will use AWS CDK to define the infrastructure of the sample stack.

## Types of Infrastructure Testing

Infrastructure testing can be broadly categorized into two main types: static testing and dynamic testing.

### Static Testing

Static testing plays a critical role in catching potential issues early in the deployment process. It involves validating the IaC templates for their correctness and reliability.

**Constructor testing** is a fundamental aspect of static testing, which checks for syntax errors, resource dependencies, and parameter validation.

When designing test cases for static testing, consider scenarios like template parameter variations, resource configuration edge cases, and security compliance checks.

Constructor testing has two main approaches:

* **Fine-grained assertions** test specific aspects of the generated AWS CloudFormation template, such as "this resource has this property with this value." that potentially can detect regressions.
* **Snapshot tests** test the synthesized AWS CloudFormation template against a previously stored baseline template

{: .important }
In our sample stacks, we will mostly implement fine-grained assertions for our CDK stack.

{: .more }
You can visit the [Testing constructs](https://docs.aws.amazon.com/cdk/v2/guide/testing.html){:target="_blank"} page of AWS to learn more about the practices of the constructor testing.

In short, for our previous example the constructor testing suite is the following ([test/constructor/static-site.test.ts]({{ site.content.samples }}/static-site/test/constructor/static-site.test.ts){:target="_blank"}), using [aws-cdk-assert](https://github.com/Idea-Pool/aws-cdk-assert){:target="_blank"}:

```typescript
import * as cdk from 'aws-cdk-lib';
import { Match } from 'aws-cdk-lib/assertions';
import { AdvancedMatcher, AdvancedTemplate, S3Bucket } from 'aws-cdk-assert';
import { StaticSiteStack } from '../../lib/static-site-stack';

describe('StaticSite Constructor Validation', () => {
  let template: AdvancedTemplate;
  let bucket: S3Bucket;

  beforeEach(() => {
    const app = new cdk.App();
    const stack = new StaticSiteStack(app, 'TestStack');
    template = AdvancedTemplate.fromStack(stack);
    bucket = template.s3Bucket();
  });

  test('S3 Bucket is created', () => {
    bucket
      .withRemovalPolicy(cdk.RemovalPolicy.DESTROY)
      .exists();
  });

  test('Propoer BucketPolicy is created', () => {
    template.s3BucketPolicy()
      .forBucket(bucket)
      .withProperty('PolicyDocument', {
        Statement: Match.arrayWith([
          Match.objectLike({
            Action: 's3:GetObject',
            Effect: 'Allow',
            Principal: { CanonicalUser: Match.anyValue() },
            Resource: AdvancedMatcher.fnJoin(Match.arrayWith([
              bucket.arn,
            ]))
          })
        ])
      })
      .exists();
  });

  test('CloudFront Distribution is created', () => {
    template.cloudFrontDistribution()
      .withProperty('DistributionConfig', {
        Origins: [
          Match.objectLike({
            DomainName: AdvancedMatcher.fnGetAtt(
              bucket.id,
              'RegionalDomainName',
            )
          }),
        ],
        CustomErrorResponses: [
          Match.objectLike({
            ErrorCode: 403,
            ResponseCode: 403,
            ResponsePagePath: "/error.html"
          })
        ],
      })
      .exists();
  })
});
```

In this suite, we test:
1. if there is a resource for the S3 bucket
2. if there is a resource for the S3 bucket policy, that sets proper policy statement to access the bucket from CloudFront
3. if there is a resource for the CloudFront distribution, that has proper origin for the bucket, and has proper error response set up

### Dynamic Testing

Dynamic testing focuses on the actual deployment of infrastructure resources and ensures their proper functioning.

**Deployment validation** is a core part of dynamic testing, which verifies that the infrastructure components are provisioned correctly and interact as expected.

During deployment validation, you should test various aspects such as resource creation, modification, and deletion, as well as network connectivity, security configurations, and performance metrics.

Dynamic testing can be performed manually by following predefined test scripts and conducting exploratory testing. To achieve higher efficiency and scalability, it is advisable to automate dynamic testing using custom scripts leveraging AWS SDKs.

For our previous example the **deployment validation** suite is the following ([test/deployment/static-site.test.ts]({{ site.content.samples }}/static-site/test/deployment/static-site.test.ts){:target="_blank"}), using **Jest** and **AWS SDK**:

```typescript
import { CloudFrontClient, GetDistributionCommand } from '@aws-sdk/client-cloudfront';
import { S3Client, ListObjectsV2Command, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { getStackOutput } from '../utils/stack';


describe('StaticSite Deployment Validation', () => {
  describe('S3 Bucket', () => {
    let objects: ListObjectsV2CommandOutput;

    beforeAll(async () => {
      const bucketName = await getStackOutput('BucketName');
  
      const s3Client = new S3Client({});
      objects = await s3Client.send(new ListObjectsV2Command({ Bucket: bucketName }));
    });

    test('deployed and accessible', () => {
      expect(objects.Contents).not.toHaveLength(0);
    });

    test('has index.html deployed', () => {
      expect(objects.Contents).toEqual(expect.arrayContaining([expect.objectContaining({Key: 'index.html'})]));
    });

    test('has error.html deployed', () => {
      expect(objects.Contents).toEqual(expect.arrayContaining([expect.objectContaining({Key: 'error.html'})]));
    });
  });

  test('CloudFront distribution is deployed', async () => {
    const distributionId = await getStackOutput('DistributionId');

    const cloudFrontClient = new CloudFrontClient({});
    const distribution = await cloudFrontClient.send(new GetDistributionCommand({ Id: distributionId }));

    expect(distribution.Distribution).toBeDefined();
  });
});
```

In this suite, we test:
1. if we have access to the bucket, by listing its objects
2. if the index.html file is deployed to the bucket
3. if the error.html file is deployed to the bucket
4. if the distribution is deployed

Further **functional tests** are also implemented, to check if we can access the content of the site and it handles errors properly ([test/deployment/static-site.test.ts]({{ site.content.samples }}/static-site/test/deployment/static-site.test.ts){:target="_blank"}), using **Jest** and **Axios**:

```typescript
import { getStackOutput } from '../utils/stack';
import axios, { AxiosError } from 'axios';

describe('StaticSite Functional Validation', () => {
  let websiteUrl: string;

  beforeAll(async () => {
    websiteUrl = await getStackOutput('WebsiteUrl');
  });

  test('CloudFront distribution has valid response', async () => {
    const response = await axios.get(websiteUrl);

    expect(response.status).toBe(200);
    expect(response.data).toContain('Static Site');
  });
  
  test('CloudFront distribution has error response', async () => {
    try {
      await axios.get(`${websiteUrl}/no-page.html`);
      fail();
    } catch (e) {
      const response = (e as AxiosError).response!;
      expect(response.status).toBe(403);
      expect(response.data).toContain('Static Site');
    }
  });
});
```

These tests can be considered as part of either the deployment validation or a functional suite.