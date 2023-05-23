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

For example, consider an [AWS S3 website with CloudFront Distribution](https://github.com/awslabs/aws-cloudformation-templates/blob/master/aws/services/S3/S3_Website_With_CloudFront_Distribution.yaml) template (partial):

```yaml
# ...
Resources:
  S3BucketForWebsiteContent:
    Type: AWS::S3::Bucket
    Properties:
      AccessControl: PublicRead
      WebsiteConfiguration:
        IndexDocument: index.html
        ErrorDocument: error.html
  WebsiteCDN:
    Type: AWS::CloudFront::Distribution
    # ...
  WebsiteDNSName:
    Type: AWS::Route53::RecordSet
    # ...
Outputs:
  WebsiteURL:
    Value: !Join ['', ['http://', !Ref 'WebsiteDNSName']]
    Description: The URL of the newly created website
  BucketName:
    Value: !Ref 'S3BucketForWebsiteContent'
    Description: Name of S3 bucket to hold website content
```

In this example, the template defines
* an **S3 Bucket** for storage and hosting the static website, 
* a **CloudFront Distribution** to deliver the content of the website with low latency and high performance, and 
* a **Route53 RecordSet** to serve the website on a custom domain.

With CloudFormation, you can deploy this template, and AWS will automatically create the bucket, the distribution, and the DNS record with the specified configurations. You can also update the template and redeploy it, allowing for infrastructure changes to be managed in a controlled and consistent manner. 

### AWS CDK

AWS CDK (Cloud Development Kit) is another powerful Infrastructure-as-Code (IaC) tool provided by AWS.

Unlike CloudFormation, CDK allows you to define your infrastructure using familiar programming languages such as TypeScript, Python, Java, and more. This gives you the flexibility to leverage the expressiveness and modularity of programming languages while provisioning AWS resources. CDK simplifies the process of infrastructure provisioning by providing a higher-level object-oriented abstraction, enabling you to define and manage your infrastructure using constructs and stacks.

Here's the AWS CDK version of the previous CloudFormation example (partial):

```typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';

export class S3WebsiteWithCloudFrontStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hostedZoneName = this.node.tryGetContext('hostedZoneName');

    const s3BucketForWebsiteContent = new s3.Bucket(this, 'S3BucketForWebsiteContent', {
      accessControl: s3.BucketAccessControl.PUBLIC_READ,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
    });

    const websiteCDN = new cloudfront.Distribution(this, 'WebsiteCDN', {
      comment: 'CDN for S3-backed website',
      defaultBehavior: {
        origin: new cloudfront.S3Origin(s3BucketForWebsiteContent),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      // ...
    });

    const websiteDNSName = new route53.CnameRecord(this, 'WebsiteDNSName', {
      zone: route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: hostedZoneName }),
      recordName: `${this.stackName}.${this.account}.${this.region}.${hostedZoneName}`,
      domainName: websiteCDN.distributionDomainName,
      ttl: cdk.Duration.seconds(900),
    });

    new cdk.CfnOutput(this, 'WebsiteURL', {
      value: `http://${websiteDNSName.domainName}`,
      description: 'The URL of the newly created website',
    });

    new cdk.CfnOutput(this, 'BucketName', {
      value: s3BucketForWebsiteContent.bucketName,
      description: 'Name of S3 bucket to hold website content',
    });
  }
}
```

By synthesizing and deploying this AWS CDK code, AWS will provision the specified bucket, distribution, and DNS record with the defined configurations.

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
You can visit the [Testing constructs](https://docs.aws.amazon.com/cdk/v2/guide/testing.html) page of AWS to learn more about the practices of the constructor testing.

In short, for our previous example a test suite would like the following:

```typescript
import { expect as cdkExpect, haveResource, Match } from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib';
import { S3WebsiteWithCloudFrontStack } from './S3WebsiteWithCloudFrontStack';

describe('S3 Website with CloudFront', () => {
  let stack: S3WebsiteWithCloudFrontStack;

  beforeEach(() => {
    const app = new cdk.App();
    const stack = new S3WebsiteWithCloudFrontStack(app, 'TestStack');
  });

  test('S3 bucket is created with public read access control', () => {
    cdkExpect(stack).to(haveResource('AWS::S3::Bucket', {
      AccessControl: 'PublicRead',
    }));
  });

  test('CloudFront distribution is created with the bucket origin', () => {
    cdkExpect(stack).to(haveResource('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Origins: [
          Match.objectLike({
            DomainName: stack.resolve(stack.s3BucketForWebsiteContent.websiteUrl),
          })
        ],
      },
    }));
  });

  test('Route 53 CNAME record is created with the expected properties', () => {
    cdkExpect(stack).to(haveResource('AWS::Route53::RecordSet', {
      Type: 'CNAME',
      TTL: '900',
      ResourceRecords: [
        stack.resolve(stack.websiteCDN.distributionDomainName),
      ],
    }));
  });
});
```

Or by using [aws-cdk-assert](https://github.com/Idea-Pool/aws-cdk-assert):

```typescript
import * as cdk from 'aws-cdk-lib';
import { S3WebsiteWithCloudFrontStack } from './S3WebsiteWithCloudFrontStack';
import { AdvancedTemplate } from 'aws-cdk-assert';
import { RecordType } from "aws-cdk-lib/aws-route53";

describe('S3 Website with CloudFront', () => {
  let template: AdvancedTemplate;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new S3WebsiteWithCloudFrontStack(app, 'TestStack');
    template = AdvancedTemplate.fromStack(stack);
  });


  test('S3 bucket is created with public read access control', () => {
    template
      .s3Bucket()
      .withProperty('AccessControl', 'PublicRead')
      .exists();
  });

  test('CloudFront distribution is created with the bucket origin', () => {
    template
      .cloudFrontDistribution()
      .withPublicS3BucketOrigin(template.s3Bucket())
      .exists();
  });

  test('Route 53 CNAME record is created with the expected properties', () => {
     template
      .route53RecordSet()
      .withRecordType(RecordType.CNAME)
      .withAliasToS3()
      .exists();
  });
});
```

### Dynamic Testing

Dynamic testing focuses on the actual deployment of infrastructure resources and ensures their proper functioning.

Deployment validation is a core part of dynamic testing, which verifies that the infrastructure components are provisioned correctly and interact as expected.

During deployment validation, you should test various aspects such as resource creation, modification, and deletion, as well as network connectivity, security configurations, and performance metrics.

Dynamic testing can be performed manually by following predefined test scripts and conducting exploratory testing. To achieve higher efficiency and scalability, it is advisable to automate dynamic testing using custom scripts leveraging AWS SDKs.

An example test suite for the example stack could be the following (using TypeScript, Jest, and AWS SDK):

```typescript
import AWS from 'aws-sdk';

const awsRegion = process.env.AWS_REGION;
const stackName = process.env.STACK_NAME;
const hostedZoneName = process.env.HOSTED_ZONE_NAME;

describe('S3 Website with CloudFront', () => {
  test('S3 bucket is created and accessible', async () => {
    const s3BucketName = await getStackOutput(stackName, 'BucketName');

    const s3 = new AWS.S3({ region: awsRegion });
    const listObjectsResponse = await s3.listObjectsV2({ Bucket: s3BucketName }).promise();

    expect(listObjectsResponse.Contents).toBeDefined();
  });

  test('CloudFront distribution is deployed and returns a valid response', async () => {
    const distributionDomainName = await getStackOutput(stackName, 'WebsiteURL');

    const cloudFront = new AWS.CloudFront();
    const getDistributionResponse = 
      await cloudFront.getDistribution({ Id: distributionDomainName }).promise();

    expect(getDistributionResponse.Distribution).toBeDefined();
  });

  test('Route 53 record set is created with the correct domain name', async () => {
    const recordSetName = await getStackOutput(stackName, 'WebsiteURL');

    const route53 = new AWS.Route53();
    const zone = await route53.listHostedZonesByName({ DNSName: hostedZoneName }).promise();
    const listResourceRecordSetsResponse = await route53.listResourceRecordSets({
      HostedZoneId: zone.HostedZones[0].Id,
    }).promise();

    const recordSet = listResourceRecordSetsResponse.ResourceRecordSets?.find(
      (rs: any) => rs.Name === `${recordSetName}.${hostedZoneName}.`
    );

    expect(recordSet).toBeDefined();
  });
});

async function getStackOutput(stackName: string, outputKey: string): Promise<string> {
  const cloudFormation = new AWS.CloudFormation({ region: awsRegion });
  const describeStacksResponse = 
    await cloudFormation.describeStacks({ StackName: stackName }).promise();

  const stack = describeStacksResponse.Stacks?.[0];
  const output = stack?.Outputs?.find((o: any) => o.OutputKey === outputKey);

  return output?.OutputValue;
}
```
