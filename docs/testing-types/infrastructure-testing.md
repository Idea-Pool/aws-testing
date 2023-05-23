---
title: Infrastructure testing
layout: default
nav_order: 3
parent: Testing types
---

# Infrastructure testing

Infrastructure testing is concerned with testing the infrastructure-as-code (IaC) templates and configurations used to provision AWS resources and the provisioned resources as well. It ensures that the infrastructure is correctly defined, provisioned, and configured according to the desired state.
{: .fs-6 .fw-300 }

Infrastructure testing is a crucial aspect of ensuring the reliability, scalability, and efficiency of your cloud-based applications and services. With the rise of Infrastructure as Code (IaC) practices, such as AWS CloudFormation, AWS CDK, and Terraform, testing becomes an essential component of the deployment pipeline. In this guide, we will explore the key concepts of infrastructure testing and its relevance within the AWS ecosystem.

## Infrastructure as Code

Infrastructure as Code (IaC) is a paradigm that enables the management and provisioning of infrastructure resources using declarative templates or scripts. AWS offers two primary IaC tools: AWS CloudFormation and AWS CDK.

### AWS CloudFormation

CloudFormation is a powerful Infrastructure-as-Code (IaC) service offered by AWS that allows you to define and provision AWS resources in a declarative manner. 

As an IaC tool, CloudFormation enables you to treat infrastructure as version-controlled code, bringing the benefits of reproducibility, scalability, and automation to your deployments. Its main features include a JSON or YAML-based template syntax, which describes the desired state of your infrastructure, automatic resource dependency management, and the ability to create, update, and delete stacks of resources as a single unit.

For example, consider a CloudFormation template that provisions an Amazon S3 bucket and an AWS Lambda function. The template defines the bucket's name, access control policies, and other properties, as well as the Lambda function's code, runtime, and trigger events.

```yaml
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-example-bucket
      AccessControl: Private

  MyLambdaFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: my-example-lambda
      Runtime: python3.8
      Handler: index.lambda_handler
      Code:
        ZipFile: |
          import json
          def lambda_handler(event, context):
              return {
                  'statusCode': 200,
                  'body': json.dumps('Hello from Lambda!')
              }
      Timeout: 30
      Role: !GetAtt MyLambdaExecutionRole.Arn

  MyLambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: my-example-lambda-role
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: sts:AssumeRole
      Policies:
        - PolicyName: my-example-lambda-policy
          PolicyDocument:
            Version: "2012-10-17"
            Statement:
              - Effect: Allow
                Action:
                  - logs:CreateLogGroup
                  - logs:CreateLogStream
                  - logs:PutLogEvents
                Resource: "*"
```

With CloudFormation, you can deploy this template, and AWS will automatically create the bucket and Lambda function with the specified configurations. You can also update the template and redeploy it, allowing for infrastructure changes to be managed in a controlled and consistent manner. 

### AWS CDK

AWS CDK (Cloud Development Kit) is another powerful Infrastructure-as-Code (IaC) tool provided by AWS. Unlike CloudFormation, CDK allows you to define your infrastructure using familiar programming languages such as TypeScript, Python, Java, and more. This gives you the flexibility to leverage the expressiveness and modularity of programming languages while provisioning AWS resources. CDK simplifies the process of infrastructure provisioning by providing a higher-level object-oriented abstraction, enabling you to define and manage your infrastructure using constructs and stacks.

Here's an example of how the same infrastructure, an Amazon S3 bucket and an AWS Lambda function, can be provisioned using AWS CDK in TypeScript:

```typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyInfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myS3Bucket = new s3.Bucket(this, 'MyS3Bucket', {
      bucketName: 'my-example-bucket',
      accessControl: s3.BucketAccessControl.PRIVATE,
    });

    const myLambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
      functionName: 'my-example-lambda',
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.lambda_handler',
      code: lambda.Code.fromInline(`
        import json
        def lambda_handler(event, context):
            return {
                'statusCode': 200,
                'body': json.dumps('Hello from Lambda!')
            }
      `),
      timeout: cdk.Duration.seconds(30),
      role: new iam.Role(this, 'MyLambdaExecutionRole', {
        roleName: 'my-example-lambda-role',
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        inlinePolicies: {
          'my-example-lambda-policy': new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: [
                  'logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents',
                ],
                resources: ['*'],
              }),
            ],
          }),
        },
      }),
    });
  }
}
```

By synthesizing and deploying this AWS CDK code, AWS will provision the specified S3 bucket and Lambda function with the defined configurations. This is where the integration with CloudFormation comes into the picture. AWS CDK internally generates a CloudFormation template based on the CDK code. The synthesized CloudFormation template represents the desired state of the infrastructure defined in CDK.

When the CDK code is deployed, AWS CloudFormation uses the synthesized template to create and manage the AWS resources accordingly. CloudFormation takes care of resource provisioning, dependency management, and handles the orchestration of the deployment process. This ensures that the infrastructure defined using AWS CDK is accurately translated into the appropriate AWS resource configurations.

## Types of Infrastructure Testing

Infrastructure testing can be broadly categorized into two main types: static testing and dynamic testing.

### Static Testing

Static testing plays a critical role in catching potential issues early in the deployment process. It involves validating the IaC templates for their correctness and reliability.

Constructor testing is a fundamental aspect of static testing, which checks for syntax errors, resource dependencies, and parameter validation. When designing test cases for static testing, consider scenarios like template parameter variations, resource configuration edge cases, and security compliance checks.

### Dynamic Testing

Dynamic testing focuses on the actual deployment of infrastructure resources and ensures their proper functioning.

Deployment validation is a core part of dynamic testing, which verifies that the infrastructure components are provisioned correctly and interact as expected. During deployment validation, you should test various aspects such as resource creation, modification, and deletion, as well as network connectivity, security configurations, and performance metrics.

Dynamic testing can be performed manually by following predefined test scripts and conducting exploratory testing. To achieve higher efficiency and scalability, it is advisable to automate dynamic testing using custom scripts leveraging AWS SDKs.

## Let's see it in action!

Coming soon...