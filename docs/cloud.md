---
title: Cloud
layout: default
nav_order: 2
---

# Cloud
{: .no_toc }

**Cloud computing** refers to the delivery of computing resources, such as servers, storage, databases, networking, and software, over the internet. It allows organizations to access and utilize these resources on-demand, without the need for on-premises infrastructure. The cloud offers **scalability, flexibility, and cost-effectiveness**, enabling businesses to focus on their core operations while leveraging powerful computing capabilities.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta}

1. TOC
{:toc}

To put it in practice, consider a webshop hosted on the cloud. Instead of setting up physical servers and managing infrastructure, the webshop can leverage cloud services. It can utilize **virtual servers**, **object storage** for product images, **managed databases** for storing customer data, and **content delivery networks** (CDNs) for faster content delivery. The webshop can **scale** resources based on demand, ensuring a seamless shopping experience for customers.

{: .more }
If you are interested in the history and more details of Cloud Computing, visit <https://en.wikipedia.org/wiki/Cloud_computing>{:target="_blank"}.

## Approaches

Cloud computing is achieved through various technologies and approaches, including virtual machines, containerization, and cloud-native services.

* **Virtual machines (VMs)** are a fundamental component of cloud infrastructure. They allow for the creation and management of multiple virtual instances on a single physical server. Each VM operates as an independent server, running its own operating system and applications. VMs provide isolation and flexibility, enabling organizations to run different workloads and applications on shared hardware resources. They can be easily provisioned, scaled, and managed in the cloud, providing agility and resource optimization.
* **Containerization** takes the concept of virtualization further by allowing applications to be packaged and deployed in lightweight, isolated containers. Containers encapsulate an application and its dependencies, providing consistency across different environments. They enable portability and fast deployment, as containers can be easily moved between different cloud environments without requiring significant changes. Containerization technologies like **Docker** and **Kubernetes** (K8S) have gained popularity for their ability to simplify application deployment, scaling, and management in the cloud.
* **Cloud-native services**, on the other hand, are specifically designed to leverage the capabilities and advantages of cloud computing. These services are built with a cloud-first mindset, taking full advantage of the scalability, flexibility, and automation offered by the cloud. Cloud-native services, such as **serverless computing**, managed databases, and AI/ML services, abstract away the underlying infrastructure complexities and allow developers to focus on building and deploying applications rapidly. They provide native integrations with other cloud components and offer advanced features for scalability, fault tolerance, and auto-scaling, enabling organizations to harness the full potential of the cloud for their applications.

Through the combination of virtual machines, containerization, and cloud-native services, cloud computing provides a powerful and flexible infrastructure that enables organizations to scale, optimize resources, and rapidly deploy and manage applications in the cloud environment.

## Types

In the context of **ownership** and security, we can broadly categorize clouds into three types, each offering distinct characteristics and considerations.

1. **Private Cloud**: A private cloud is dedicated to a single organization and provides exclusive use of cloud resources. It offers enhanced security, control, and customization but requires significant infrastructure investment and maintenance.
1. **Public Cloud**: Public clouds are owned and operated by cloud service providers. They offer shared resources accessible to the public over the internet. Public clouds are cost-effective, scalable, and provide a wide range of services. AWS, Microsoft Azure, and Google Cloud Platform (GCP) are examples of public cloud providers.
1. **Hybrid Cloud**: A hybrid cloud combines both private and public clouds, allowing organizations to take advantage of the benefits of both. It enables seamless data and application portability between environments, providing flexibility and enabling workload optimization.

## Service Models

In the realm of cloud computing, various service models exist to cater to diverse business needs. 

* **Infrastructure as a Service (IaaS)**: With IaaS, organizations have access to **virtualized infrastructure resources**, such as virtual machines, storage, and networking components. It provides a flexible and scalable infrastructure foundation, allowing businesses to manage and control their applications and data while eliminating the need for physical hardware ownership.
* **Platform as a Service (PaaS)**: PaaS offers a **platform** on which developers can **build and deploy applications**. It provides a complete development and deployment environment, including infrastructure, development tools, and runtime environment. PaaS abstracts away the underlying infrastructure complexities, allowing developers to focus on application development rather than infrastructure management.
* **Software as a Service (SaaS)**: SaaS delivers **software applications over the internet** on a subscription basis. Users can access and use these applications through a web browser or client interface without the need for local installation. SaaS eliminates the need for organizations to manage software installation, maintenance, and updates, as these responsibilities lie with the service provider.
* **Function as a Service (FaaS)**: FaaS, also known as **serverless computing**, allows developers to execute individual functions or units of code in response to events. It abstracts away the infrastructure management, enabling developers to focus solely on writing and deploying functions. FaaS is highly scalable, as it automatically scales the execution environment based on demand.

{% include image.html 
    url="{{ site.baseurl }}/assets/images/cloud_service_models.png" 
    description="Services you or the Vendors’ manager in different models"
%}

The main difference among these service models lies in the **ownership** and **management** responsibilities. With IaaS, organizations have more control over the infrastructure layer and are responsible for managing and maintaining the operating systems, middleware, and applications. In PaaS, the responsibility shifts to the cloud provider, who manages the underlying infrastructure, while organizations focus on application development. SaaS, on the other hand, transfers the ownership and management entirely to the service provider, as they handle the entire software stack. FaaS further abstracts the infrastructure layer, allowing developers to focus solely on writing and deploying functions, without any ownership of the underlying infrastructure.

{: .more }
To learn more about the service models in AWS, visit <https://aws.amazon.com/types-of-cloud-computing>{:target="_blank"}.

## Cloud Providers

Explore the three prominent cloud providers that are renowned for their extensive public cloud offerings as well as robust support for private and hybrid cloud environments, making them crucial considerations in your cloud journey.

* **Amazon Web Services (AWS)**: [AWS](https://aws.amazon.com/){:target="_blank"} is a comprehensive and widely adopted cloud platform offering a broad range of services, including compute, storage, databases, machine learning, and more. It provides a highly scalable and secure infrastructure, with extensive global coverage and a rich ecosystem of tools and services.
* **Microsoft Azure**: [Microsoft Azure](https://azure.microsoft.com/){:target="_blank"} is a cloud computing platform that provides a wide array of services for building, deploying, and managing applications. It offers integration with Microsoft tools and technologies, robust support for hybrid scenarios, and a strong focus on enterprise capabilities.
* **Google Cloud Platform (GCP)**: [GCP](https://cloud.google.com/gcp){:target="_blank"} provides a suite of cloud computing services, including compute, storage, networking, machine learning, and data analytics. It emphasizes data analytics, machine learning, and AI capabilities, with seamless integration with other Google services.

## Testing

Testing in the cloud shares similarities with traditional application testing but with additional benefits.

* In case of **functional testing**, testers can provision and configure test environments quickly, replicate production-like environments, and leverage cloud-based testing tools. It enables efficient and scalable test execution, parallel test runs, and the ability to test from multiple geographic locations. Overall, functional testing in the cloud enhances agility and accelerates the testing process.
* **Non-functional testing** is more important in the cloud due to the dynamic and scalable nature of cloud environments. It focuses on aspects such as performance, scalability, security, and resilience. Non-functional testing in the cloud allows for load testing at scale, assessing system performance under various scenarios. It also facilitates security testing, including vulnerability assessments and penetration testing, to ensure data protection and compliance. The cloud provides a robust foundation for non-functional testing, enabling comprehensive validation of application behavior and quality.

{: .more }
To learn more about Cloud Computing, one good source is <https://www.guru99.com/cloud-computing-for-beginners.html>{:target="_blank"}.

{: .questions }
> 1. What are the three main types of clouds in terms of ownership and security?
> 1. Define public, private, and hybrid clouds and provide a brief explanation of their characteristics.
> 1. What is the difference between IaaS, PaaS, and SaaS? Provide a concise definition for each.
> 1. Explain how each service model offloads responsibilities to the cloud provider and impacts ownership and management for organizations.
> 1. Name three leading cloud providers and briefly describe their core offerings and strengths.
> 1. Discuss the benefits and considerations of each cloud provider in terms of scalability, reliability, and service diversity.
> 1. Differentiate between virtual machines (VMs), containerization, and cloud-native services.
> 1. Explain how VMs, containers, and cloud-native services contribute to scalability, deployment flexibility, and resource optimization in the cloud.