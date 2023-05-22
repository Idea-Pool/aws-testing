---
title: Introduction
layout: default
nav_order: 1
---
# Introduction

Testing is a crucial part of the software development lifecycle, and it becomes even more important in the context of **cloud computing**. With the rise of cloud services like **Amazon Web Services** (AWS), developers and testers need to adapt their testing practices to ensure software product quality (including quality attributes, e.g: **functional suitability**, **reliability**, **security**, **performance**) of their applications.
{: .fs-6 .fw-300 }

{: .note }
This documentation is still **under development**!

This guide aims to provide an **overview of the testing practices** that can be adapted to testing in the cloud, specifically in AWS, and to offer **best practices** and tips for effective testing.

Through the pages of this guide, we will explore the following questions:
1. What is the cloud, and what is AWS?
2. What tools can we use to interact with AWS?
3. How do different testing types apply to cloud environments?
4. What are the main AWS services, and how can we test them[^1] effectively?
5. What solutions can we utilize to mock and stub during testing?
6. What are the main testing tools available for AWS?

While *exhaustive testing is not possible*[^2], we will focus on practical aspects of testing, especially for AWS services. For each service, we will cover its **basic functionalities**, how applications built on it can be tested, and provide **practical examples of testing types** in use.

It's important to note that both testing and AWS services are constantly evolving, and some information in this guide may become outdated over time. We encourage you to **contribute** your insights to this guide or inform us of any outdated information you encounter.

Let's dive into the world of testing in AWS!

[^1]: When discussing testing practices for AWS, it's important to note that we won't be testing the AWS services themselves. Instead, we will focus on testing the applications built on top of these services.
[^2]: 7 Principles of Software Testing - <https://www.guru99.com/software-testing-seven-principles.html>{:target="_blank"}
