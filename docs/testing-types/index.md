---
title: Testing types
layout: default
nav_order: 4
has_children: true
---

# Testing types applied for AWS

The following list is a high-level description of each testing type relevant to this guide. Each testing type plays a crucial role in ensuring the quality, reliability, and performance of applications in the AWS cloud environment.

To learn more about each type and best practices for implementation, we recommend visiting their respective pages. This guide provides a comprehensive overview of testing practices tailored specifically to the AWS ecosystem.

- **Manual Testing**: Manual testing involves human testers executing test cases and exploring the application's functionality to identify defects. While automated testing is preferred for its efficiency, manual testing remains valuable, especially for user experience validation, usability testing, and ad-hoc testing in the AWS cloud environment.
- **Unit Testing**: Unit testing focuses on verifying the smallest testable components of an application. In the context of AWS, unit testing becomes crucial for validating the functionality and behavior of individual serverless functions, AWS Lambda functions, or microservices developed using AWS technologies.
- **Infrastructure Testing**: Infrastructure testing is concerned with testing the infrastructure-as-code (IaC) templates and configurations used to provision AWS resources and the provisioned resources as well. It ensures that the infrastructure is correctly defined, provisioned, and configured according to the desired state. Infrastructure testing is relevant for testing AWS CloudFormation templates, AWS CDK projects, or Terraform configurations and the AWS Resource provisioning.
- **Integration Testing**: Integration testing verifies the correct interaction and communication between different components or services within an application or across applications. In the AWS cloud environment, integration testing becomes critical for testing the seamless integration of various AWS services, such as AWS Lambda functions, Amazon API Gateway, Amazon S3, AWS Step Functions, or Amazon RDS databases.
- **System Testing**: System testing validates the entire application system as a whole, ensuring that all components work together as expected. In the AWS cloud, system testing becomes relevant for testing the end-to-end functionality of multi-tier applications, including frontend, backend, and any integrations with external systems or services.
- **Performance Testing**: Performance testing assesses the performance characteristics of an application under various workloads and conditions. In the AWS cloud, performance testing is highly relevant for evaluating the scalability, response time, throughput, and resource utilization of applications that leverage AWS services such as Amazon EC2, Amazon Aurora, Amazon DynamoDB, or AWS Elastic Load Balancer.
- **Security Testing**: Security testing focuses on identifying vulnerabilities, weaknesses, and potential risks to ensure the application and its data remain secure. In the AWS cloud, security testing is crucial for evaluating the security configurations, access controls, encryption mechanisms, and overall compliance with security best practices.
- **Chaos Testing**: Chaos testing involves deliberately introducing failures or disruptions into a system to evaluate its resilience and stability. In the AWS cloud, chaos testing becomes important to assess how applications and infrastructure respond to unexpected events or failures, such as testing the behavior of an application during an AWS service outage or simulating network failures using tools like Chaos Monkey.

These testing types provide a comprehensive approach to ensuring the quality, performance, security, and reliability of applications in the AWS cloud environment. Depending on the specific requirements and characteristics of your application, you may choose to prioritize and tailor the testing approach accordingly.