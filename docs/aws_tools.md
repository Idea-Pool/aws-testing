---
title: AWS tools
layout: default
nav_order: 3
---

# AWS tools
{: .no_toc }

The testing process for AWS services involves utilizing a variety of tools to effectively validate the functionality, performance, and security of your applications.
{: .fs-6 .fw-300 }

This page provides an overview of essential tools commonly used in testing AWS services. Each tool serves a specific purpose, offering features and capabilities that support different testing tasks and types. By leveraging these tools, you can streamline your testing efforts and ensure the reliability of your AWS deployments.

*Note: The following list is not a comprehensive list of the tools related to testing AWS resources. The mentioned example tasks are focused on testing-specific use cases for each tool. However, these tools offer a broader range of capabilities beyond testing, which can be explored in their respective documentation.*

## Table of contents
{: .no_toc .text-delta}

1. TOC
{:toc}

## AWS Console

The AWS Console is a web-based user interface provided by AWS. It allows users to interact with and manage their AWS resources and services. With a user-friendly interface, the AWS Console provides a centralized platform to configure, monitor, and test various AWS services. Some of its key features include resource management, service configuration, log analysis, and access control.

The AWS Console is used for provisioning and configuring AWS resources for testing purposes, monitoring service health, performance, and metrics during testing, and analyzing logs and debugging issues encountered during testing.

The AWS Console is a versatile tool used across different testing types, including manual testing, integration testing, system testing, security testing, and acceptance testing.

{: .more }
<https://aws.amazon.com/console>{:target="_blank"}

## AWS CLI

The AWS Command Line Interface (CLI) is a powerful tool that enables users to interact with AWS services through a command-line interface. It provides a unified interface to perform various operations, automate tasks, and manage AWS resources. The AWS CLI offers extensive functionalities, including resource management, service provisioning, and interaction with AWS APIs.

The AWS CLI is used for automating testing workflows and tasks using scripts or CI/CD pipelines, interacting with AWS services programmatically for testing purposes, and managing and configuring AWS resources required for testing.

The AWS CLI is particularly useful for tasks related to integration testing, system testing, performance testing, security testing, and regression testing.

{: .more }
<https://aws.amazon.com/cli>{:target="_blank"}

## AWS SDK

The AWS Software Development Kit (SDK) provides programming interfaces and libraries for multiple programming languages. It allows engineers to interact with AWS services programmatically, integrating AWS functionality into their applications and tests. The AWS SDK provides a range of features and utilities to simplify the development and testing process, including authentication, request signing, and service-specific operations.

The AWS SDK is used for writing custom test scripts and scenarios to validate application behavior, simulating interactions with AWS services for testing purposes, and automating the execution of test cases and scenarios using the AWS SDK.

The AWS SDK is essential for tasks associated with unit testing, integration testing, system testing, and performance testing.

{: .more }
<https://www.npmjs.com/package/aws-sdk>{:target="_blank"}

## AWS CDK

The AWS Cloud Development Kit (CDK) is an open-source software development framework that allows developers to define cloud infrastructure using familiar programming languages. It enables infrastructure-as-code (IaC) practices by providing high-level constructs to define AWS resources and their interdependencies. With the AWS CDK, developers can define, provision, and manage AWS infrastructure using code.

The AWS CDK is used for defining and provisioning AWS resources specifically for testing purposes, managing and automating infrastructure configuration for testing, and testing infrastructure changes and deployments in a controlled manner.

The AWS CDK is particularly relevant for infrastructure testing, integration testing, and system testing.

{: .more }
<https://aws.amazon.com/cdk>{:target="_blank"}

## AWS SAM

The AWS Serverless Application Model (SAM) is an open-source framework for building serverless applications on AWS. It provides a simplified syntax for defining serverless resources and their configurations. With AWS SAM, developers can define and deploy serverless applications using AWS CloudFormation templates.

AWS SAM is used for building and deploying serverless applications for testing purposes, testing serverless functions locally before deployment to AWS, and defining and testing event triggers and API endpoints of serverless applications.

AWS SAM is particularly relevant for unit testing, integration testing, and system testing of serverless applications. It facilitates the testing of individual serverless functions and their integration with other AWS services.

{: .more }
<https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html>{:target="_blank"}