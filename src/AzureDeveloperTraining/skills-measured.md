# Skills Measured

As I'm preparing for the AZ-204 Exam.  These are my notes that following the official [Skills Measured](https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4oZ7B) document published by Microsoft.

## Develop Azure compute solutions (25-30%)

### Implement IaaS solutions
#### provision VMs
- IaaS Offering Consisting of:
  - Servers and Storage
  - Networking firewalls
  - Physical hardware
- VM name is a maximum of 15 characters long
- By default the VM name and computer name are the same.  They can differ if you upload your own OS image.
- locations can be across the globe
```bash
az account list-locations
```
- only 64-bit operating systems are supported
- VM's require that the following resources exist:
  - resource group (REQ)
  - storage account (REQ)
  - virtual network (REQ)
  - public IP address (NOT REQ)
  - network interface (REQ)
  - data disks (REQ)
- various sizes exist
  - General Purpose
  - Compute Optimized
  - Memory Optimized
  - Storage Optimized
  - GPU Optimized
  - High Performance Compute
- WARNING: resizing causes a restart, which can reconfigure the IP address
- **Availability Sets** 
  - provide redundancy within a datacenter
  - RECOMMENDATION: at least 2 VM's per availability set to meet 99.95% SLA
  - Availability sets carry no additional cost on their own
- **Fault Domains**
  - share a common power source and network switch
  - Azure automatically distributes VM's from an Availability SET into DIFFERENT fault domains
- **Update Domains**
  - a logical group of hardware that can undergo maintenance / reboots at the same time.  Only one update domain is updated at a time
  - as you create VMs within an availability zone, Azure puts them in separate update domains
- **Linux** VMs
  - many flavors, including Ubuntu, CentOS, Core OS, Oracle Linux, Red Hat

#### configure VMs for remote access
#### create ARM templates
- Resource Manager
  - a deployment and management service in Azure
  - authenticates and authorizes
  - receives requests from API, CLI, SDKs, etc
  - provides consistent results regardless of the tool used
  - Terms
    - Resource
    - Resource Group
    - Resource Provider - provides operations related to a particular type of resource
    - Resource Manager Template (ARM template) - JSON file that defines resources
    - Declarative Syntax - explains "what I want to create", but NOT how to do it
- SCOPE
  - There are 4 levels (KNOW THESE)
    - Management Group
    - Subscriptions
    - Resource Groups
    - Resources
  - management settings can be applied at any level
  - Lower levels inherit from higher levels
  - You can deploy ARM templates to Management Groups, Subscriptions, or Resource Groups, but NOT TO RESOURCES
  - when you deploy a template, Resource Manager converts the template into REST API operations
  - multi-tiered applications can be deployed as a single template or multiple templates
  - **NESTED TEMPLATES** can be referenced from **PARENT TEMPLATES**, which enables re-use
  - **dependencies** in templates tell Resource Manager the order in which to deploy related resources
  - if the specified resource already exists, Resource Manager will update the resource
  - **Extensions** provide a way to work with Resource Manager via tools like Chef, Puppet, or DSC
  - templates can be managed in source control as code
  - the **`condition`** element in a template is used to specify if a particular resource should be deployed
  - **`reference`** or **`list`** functions within conditional resources are ALWAYS evaluated, even if the conditional resource is not deployed
  - **`if`** can be used to ensure that a function is only evaluated under certain conditions
  - Deployment Modes for Resource Manager
    - there are 2
      - Complete - will remove any existing resources in the resource group if they're not in the template
      - Incremental - will not touch any resources in the resource group that are not in the template
    - in either mode, Resource Manager tries to create/update resources in the template
    - if you try to update the location or type of an existing resource, the deploy fails
    - **API Versions**
      - before version **2019-05-10**, if resources are omitted due to a **condition**, they weren't deleted
      - starting with **2019-05-10**, omitted resources due to a **condition** ARE deleted
    - NOTE: DELETE mode applies to **`COPY`** loops too
    - IN EITHER MODE: updated a resources are always updated to reflect the template, including the removal of properties

```powershell
New-AzResourceGroupDeployment -Mode Complete
```

```bash
az group deployment create -- mode Complete
 ```

#### create container images for solutions by using Docker

- Containers
  - run images Without Images


#### publish an image to the Azure Container Registry
#### run containers by using Azure Container Instance
> Azure Kubernetes Service (AKS) is out of scope

### Create Azure App Service Web Apps
#### create an Azure App Service Web App
#### enable diagnostics logging
#### deploy code to a web app
#### configure web app settings including SSL, API, and connection strings
#### implement autoscaling rules, including scheduled autoscaling, and scaling by operational or system metrics

### Implement Azure functions
#### implement input and output bindings for a function
#### implement function triggers by using data operations, timers, and webhooks
#### implement Azure Durable Functions

## Develop for Azure storage (10-15%)
### Develop solutions that use Cosmos DB storage
#### select the appropriate API for your solution
#### implement partitioning schemes
#### interact with data using the appropriate SDK
#### set the appropriate consistency level for operations
#### create Cosmos DB containers
#### implement scaling (partitions, containers)
#### implement server-side programming including stored procedures, triggers, and change feed notifications

### Develop solutions that use blob storage
#### move items in Blob storage between storage accounts or containers
#### set and retrieve properties and metadata
#### interact with data using the appropriate SDK
#### implement data archiving and retention
#### implement hot, cool, and archive storage

## Implement Azure security (15-20%)

### Implement user authentication and authorization
#### implement OAuth2 authentication
#### create and implement shared access signatures
#### register apps and use Azure Active Directory to authenticate users
#### control access to resources by using role-based access controls (RBAC)

### Implement secure cloud solutions
#### secure app configuration data by using the App Configuration and KeyVault API
#### manage keys, secrets, and certificates by using the KeyVault API
#### implement Managed Identities for Azure resources

## Monitor, troubleshoot, and optimize Azure solutions (10-15%)

### Integrate caching and content delivery within solutions
#### develop code to implement CDNs in solutions
#### configure cache and expiration policies for FrontDoor, CDNs, or Redis caches Store and retrieve data in Azure Redis cache

### Instrument solutions to support monitoring and logging
#### configure instrumentation in an app or service by using Application Insights
#### analyze log data and troubleshoot solutions by using Azure Monitor
#### implement Application Insights Web Test and Alerts
#### implement code that handles transient faults

## Connect to and consume Azure services and third-party services (25-30%)

### Develop an App Service Logic App
#### create a Logic App
#### create a custom connector for Logic Apps
#### create a custom template for Logic Apps

### Implement API Management
#### create an APIM instance
#### configure authentication for APIs
#### define policies for APIs

### Develop event-based solutions
#### implement solutions that use Azure Event Grid
#### implement solutions that use Azure Notification Hubs
#### implement solutions that use Azure Event Hub

## Develop message-based solutions
#### implement solutions that use Azure Service Bus
#### implement solutions that use Azure Queue Storage queues