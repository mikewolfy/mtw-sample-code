# Azure Developer Training

## Resources

- [Learining Path](http://aka.ms/az204/learningpath)
- [Walkthrough](http://aka.ms/az204/guidedwalkthroughs)
- [Study Guide](http://aka.ms/az204/studyguide)
- [Microsoft Training Site](https://tsfb.learnondemand.net/) D601DDF2

## Deeper Dive

- hybrid connections
- app service local cache

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
