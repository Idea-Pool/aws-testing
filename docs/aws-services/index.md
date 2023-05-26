---
title: AWS Services
layout: default
nav_order: 5
has_children: true
has_toc: false
---

# Testing AWS services

AWS (Amazon Web Services) is a comprehensive cloud computing platform provided by Amazon. It offers a vast range of services and tools that enable businesses and individuals to build, deploy, and manage applications and infrastructure in a highly scalable and cost-effective manner. AWS operates on a global scale, with data centers located in various regions worldwide, ensuring low-latency access and high availability.
{: .fs-6 .fw-300 }

With AWS, users can leverage a pay-as-you-go model, where they pay only for the resources they consume, allowing for flexibility and cost optimization. Additionally, AWS provides robust security measures and compliance frameworks, ensuring the protection and privacy of data.

## Pricing and Free Tier

AWS offers a variety of pricing options, allowing users to select the most suitable model based on their needs. The pricing is based on the type and size of resources used, such as compute instances, storage, and data transfer.

For those new to AWS, the platform provides a **Free Tier** that offers limited access to many services for a 12-month period. This allows users to explore and experiment with AWS services at no cost. The Free Tier includes a generous set of resources, such as EC2 instances, S3 storage, and RDS databases, enabling users to get hands-on experience with various services without incurring charges.

{: .important }
> **Managing Costs while using the CDK Examples**
> 
> We aimed to utilize mostly Free Tier services available on AWS in the sample CDK stack used in this guide. However, it is essential to be aware that **some services may incur charges**, even within the Free Tier limits. To avoid unexpected costs, it is crucial to exercise caution and closely monitor your resource usage.
> 
> We strongly recommend that you take precautionary measures by thoroughly reviewing the services used in the sample stack and ensuring their compatibility with the Free Tier. Additionally, it is advisable to promptly deprovision or **delete the sample stack once you have completed your testing or learning exercises**. This ensures that you do not inadvertently continue incurring any unintended costs.
>
> * [Tracking your AWS Free Tier usage](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/tracking-free-tier-usage.html){:target="_blank"}
> * [Avoiding unexpected charges](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/checklistforunwantedcharges.html){:target="_blank"}

## Setting up AWS Environment

To begin working with AWS, you can follow these steps to set up your environment.

1. **Create an account**: If you don't already have an AWS account, you can sign up for one on the AWS website. The registration process is straightforward and requires basic information: [Create and activate AWS account](https://repost.aws/knowledge-center/create-and-activate-aws-account){:target="_blank"} or [AWS Free Tier](https://aws.amazon.com/free/){:target="_blank"}.
2. **Set up AWS CLI**: The AWS CLI allows you to interact with AWS services from the command line. Follow this guide to install it: [Getting started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html){:target="_blank"}.
3. **Configure AWS CLI**: After installing the AWS CLI, you need to configure it with your AWS Access Key ID and Secret Access Key: [Configuring the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html){:target="_blank"}.
4. **Set up AWS CDK**: AWS CDK is used in our sample stacks. If you want to deploy and use them, you'll need AWS CDK installed: [Getting started with the AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html){:target="_blank"}.

## AWS Services and Testing Activities

On the children pages we will cover in details the following services:

{% include aws-service.md icon="APIGateway" service="API Gateway" page="api-gateway"
    content="API Gateway is a fully managed service that enables the creation, deployment, and management of APIs. During testing, you can validate the functionality and performance of your APIs, including authentication and authorization mechanisms, request/response handling, and integration with backend services." %}

{% include aws-service.md icon="Athena" service="Athena" page="athena"
    content="Amazon Athena allows you to analyze data stored in Amazon S3 using SQL queries. In testing scenarios, you can verify the accuracy of query results, assess query performance, and validate data formats and structures." %}

{% include aws-service.md icon="CloudWatch" service="CloudWatch" page="cloudwatch"
    content="CloudWatch is a monitoring and observability service that provides real-time insights into AWS resources and applications. In testing, you can observe the logs, set up alarms and metrics to track the health and performance of your systems, ensuring they meet predefined thresholds." %}

{% include aws-service.md icon="DynamoDB" service="DynamoDB" page="dynamodb"
    content="DynamoDB is a fully managed NoSQL database service. Testing activities may include validating data consistency, scalability, and performance under different workload conditions, as well as testing the integration of DynamoDB with your applications." %}

{% include aws-service.md icon="EC2" service="EC2" page="ec2"
    content="Amazon Elastic Compute Cloud (EC2) offers resizable compute capacity in the cloud. During testing, you can assess the performance and scalability of your applications running on EC2 instances, test different instance types, and evaluate load balancing and auto-scaling configurations. EC2 instances can be also used to host test automation solutions." %}

**[ECS]({{ 'aws-services/ecs' | relative_url }})**: Amazon Elastic Container Service (ECS) is a scalable container orchestration service. Testing activities may involve container image deployment, scaling policies, and monitoring the performance of containerized applications.
{: .aws-service }

**[ELB]({{ 'aws-services/elb' | relative_url }})**: Elastic Load Balancing (ELB) distributes incoming application traffic across multiple EC2 instances or containers. Testing can include validating load balancing algorithms, health checks, and failover mechanisms.
{: .aws-service }

**[EventBridge]({{ 'aws-services/eventbridge' | relative_url }})**: EventBridge is a serverless event bus service that simplifies the integration and delivery of events across various AWS services and third-party applications. During testing, you can verify event routing, transformation, and reliable delivery.
{: .aws-service }

**[Glue]({{ 'aws-services/glue' | relative_url }})**: AWS Glue is a fully managed extract, transform, and load (ETL) service for data preparation and transformation. Testing activities may involve validating data ingestion, transformation logic, and data quality checks.
{: .aws-service }

**[IAM]({{ 'aws-services/iam' | relative_url }})**: AWS Identity and Access Management (IAM) allows you to manage user access and permissions for AWS services. In testing, you can verify role-based access controls, authentication mechanisms, and fine-grained permissions.
{: .aws-service }

**[Lambda]({{ 'aws-services/lambda' | relative_url }})**: AWS Lambda is a serverless compute service that lets you run code without provisioning or managing servers. Testing activities can include function invocation, performance testing, and integration with other AWS services.

**[RDS]({{ 'aws-services/rds' | relative_url }})**: Amazon Relational Database Service (RDS) offers managed database solutions for various database engines. During testing, you can evaluate database performance, replication configurations, and backup and restore processes.

**[S3]({{ 'aws-services/s3' | relative_url }})**: Amazon Simple Storage Service (S3) provides scalable object storage for various data types. Testing may involve data upload and retrieval, access controls, data durability, and performance benchmarks.

**[SNS]({{ 'aws-services/sns' | relative_url }})**: Simple Notification Service (SNS) enables the publishing and delivery of messages to subscribed endpoints. In testing, you can verify message delivery, notification formats, and integration with other AWS services.

**[SQS]({{ 'aws-services/sqs' | relative_url }})**: Simple Queue Service (SQS) is a fully managed message queuing service. Testing activities may involve message processing, queue management, and assessing the reliability of message delivery.

**[Step Functions]({{ 'aws-services/step-functions' | relative_url }})**: AWS Step Functions allows you to coordinate distributed applications and microservices using visual workflows. During testing, you can validate state transitions, error handling, and the overall flow of your applications

**[VPC]({{ 'aws-services/vpc' | relative_url }})**: Amazon Virtual Private Cloud (VPC) enables you to create a logically isolated network within AWS. Testing activities may include network configuration, security group rules, and connectivity testing between resources.

By understanding these AWS services and their associated testing activities, you can effectively test and ensure the functionality, reliability, performance, and security of your applications and infrastructure on the AWS platform.

{: .note }
> It's important to note that the list of AWS services provided above is not exhaustive. 
> As you explore and work with AWS, you may come across additional services that are relevant to your specific needs and testing requirements. We encourage you to extend this list based on your experiences and share your insights with the community.
> 
> If you have valuable expertise or testing insights related to AWS services not mentioned here, **we welcome you to contribute to this guide**. Your contributions can enhance the collective knowledge and benefit others who are navigating the world of AWS testing. 