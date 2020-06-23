# Azure Developer Training

## Resources

- [Learining Path](http://aka.ms/az204/learningpath)
- [Walkthrough](http://aka.ms/az204/guidedwalkthroughs)
- [Study Guide](http://aka.ms/az204/studyguide)
- [Microsoft Training Site](https://tsfb.learnondemand.net/) D601DDF2

## Deeper Dive

- hybrid connections
- app service local cache

## Takeaways

- you can get IP addresses for app services to IP filter their dependencies
- storage accounts could have tighter access control

## Topics

### App Services

- supports .NET, Java, Ruby, Node.JS, PHP, Python
- execute in a managed sandbox environment
- scalable
- near instant deployment
- connectors to SaaS platforms, including Salesforce, Facebook, etc.
- secure and compiant
- **App Service Plans** can group applications together within a subscription
  - dictate billing
- built in authentication and authorization support
- user claims are made available to code
- built in toke store
- logging and tracing enabled for authentication events
- support for popular identity providers: Google, Facebook, etc.
- **Hybrid Connections** - enable access to resources in other networks
  - invovles a hybrid resource connection
- **Traffic Manager** routes requests, configured using proviles
  - can be based on Priority, Weighted (could distribute evenly), Performance, or Geographic
- Azure App Service Local Cache - provides a write but discard cache
- **App Service Environments**
  - used for high scale
  - virtual network
  - dedicated resources
- can run on either Linux or Windows
- can run in **App Service on Linux**
  - containers can easily be sourced from Docker Hub or Azure Container Registry

#### Azure CLI commands

```sh
az appservice plan create --name $name --resource-group $rgname --sku FREE

az webapp create --name $webappname --resource-group $rgname --plan $ webappname

az webapp deployment source config --name $webappname --resource-group <resourcegroupname>  --repo-url <githuburl> --branch master --manual-integration

# creates an application with a bunch of defaults, including resource group and plan
az webapp up --location ... name <appname> --html

az group delete --name ManagedPlatform --no-wait --yes
```

#### Powershell commands

```powershell
New-AzWebApp

New-AzAppServicePlan

New-AzResourceGroup
```

#### App Settings

- overrides web.config or appsettings.json
- sets app settings, connection strings, default documents, path mappings, custom containers
- hidden by default in the Azure Portal

##### Default Documents

- only available for Windows Apps

##### Path Mappings

- used to map container storage

#### Commands

```sh
az webapp config set ...
```

#### CORS

Mechanism for servers to indicate which requests they support

#### IP Addresses

- single inbound IP addresses
- a set of outbound IP addresses
- IP can change if you delete and recreate app, or delete SSL binding

```sh
az webapp show --query outboundIPAddresses --output tsv
```

#### Scaling

Criteria include:

- CPU
- Memory
- Disc queue length
- Http queue
- Data in
- Data out

Highlights

- Can schedule scaling based on various criteria: days of the week, etc.
- every scale out rule should have a corresponding scale-in rule
- app service can have a single autoscale setting
  - setting can have one to many profiles
  - profile can have one-to-many scaling rules
- best practices
  - maximum and minimum values are different
  - manual settings are overwritten by auto-scale settings
  - always use scale-out and scale-in together
  - choose the correct metric and thresholds carefully

#### Deployment Slots

- can swap slots, they swap only after warmed up
- can push a percentage of traffic

```sh
az webapp deployment slot swap ---....
```

### Azure Functions

#### Overview

- Can be triggered in different ways:
  - HTTP request
  - Azure events (Event Grid or Event Hub)
  - Schedule
  - Service bus queues and topics
  - Triggers based on third party services, such as GitHub
- Should generally be smaller pieces of logic
- built on **WebJobs** code
- supports a variety of programming languages
  - C#
  - JAVA
  - PHP
  - Python
  - JS
  - etc.
- can utilize a **Consumption** or **App Service** plan
- Bindings
  - connect to services without writing the plumbing
  - credentials are NOT stored in code
- Azure Virtual Networks can be integrated with Functions, but require a **Premium Plan**

#### Best Practices

- avoid long running transactions
- use queues for cross-function communication
- for direct communication use Durable Functions or Logic Apps
- Functions should be stateless and idempotent
- state data should be associated with inputs and outputs
- code defensively

#### Developing

- can edit in the portal

#### Durable Functions

- can write **stateful** functions
- manages state, checkpoints, and restarts
- allows for **chaining** of functions together; a durable orchestrator can call other functions in sequence
- allows for **fan-out** model in which one function can call others in parallel

### Azure Blob Storage

- object storage for the cloud
- designed for
  - serving images or documents
  - video and audio
  - log files
  - backup files
  - available via HTTP/HTTPS API
- 3 tier hierarchy
  - Storage Account
  - Container
  - Blob
    - Block Blob
      - up to 100 MB chucks
      - can be comprised of up to 50,000 blocks
    - Append Blob
      - optimized for append
      - good for logs
    - Page blobs (hard drives)
      - composed of 512-byte pages
      - used for virtual hard disks
- availability options (Access Tiers)
  - Local Redundant Storage
  - Zone Redundant Storage
  - Geo-redundant Storage
  - Geo-redundant + read access in secondary
  - Geo-zone redundant
  - Geo-zone redundant with read access in secondary
- Storage Tiers
  - Premium - Low and consistent latency dta
  - Hot - frequently accessed data
  - Cool - less frequently accessed data
  - Archive - rarely accessed data
- Lifecycle Management
  - rule based automation for data tiering and retention
  - runs daily on storage account
  - can set rules to:
    - move files from Hot to Cold
    - move files to Archive
    - delete files
    - delete snapshots
- Types of storage

  - containers
  - file shares
  - tables
  - queues

  #### [Code Snippet](./azure.storage.md)

### IaaS Solutions (Virtual Machines and Containers)

#### Provision VMs

Virtual Machines can use 2 types of disks

1. Standard
2. Premium - uses SSD for top performance on I/O intensive workloads

You can choose either:

- unmanaged disks - manually create and manage virtual hard disks
- managed disks - Microsoft takes care of overhead

##### Create a VM

- can pick from temlates
  - based on processing, memory, disk, networking
  - categories:
    - General
    - Compute
    - Memory
    - Storage
    - GPU
    - High Performance Compute
- basics
  - region
  - resource group
  - authentication type
    - SSH public key
    - password
  - Admin user name
  - inbound port rules
- disks can pick from:
  - Standard HDS
  - Standard SSD
  - Premium SSD
- Advanced
  - Use Managed Disks
  - Set a Storage Account
- Networking
  - can join a VNet or create one
  - can select inbound ports (SSH, HTTP, etc.)
- Other
  - Use Managed Identity
  - Use AAD to login
  - setup auto-shutdown

##### Highlights

- **PerfInsights** will send out metrics on the VM
- single VM SLA 99.9%, Multi VM: 99.99%

![VM Sizes](./images/vm.sizes.png)

```sh
New-AzVM -Name -Location

Get-AzPublicIpAddress -ResourceGroupName <name>
```

![VM Availability](./images/vm.availability.png)

![Fault](./images/fault.domains.availability.png)

![Image Gallery](./images/shared.vm.image.gallery.png)

#### ARM Templates

- multiple resources can utlize **nested templates**
-

```sh
az group deployment create --name <name> --resource-group <rg-name> --template-file <json file>
```

#### Container Images

#### Container Registries
