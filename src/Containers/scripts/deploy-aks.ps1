#https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-function-linux-custom-image?tabs=bash%2Cportal&pivots=programming-language-csharp

az login

$ResourceGroupName = Read-Host -Prompt 'Enter Resource Group Name:'
$RegistryName = Read-Host -Prompt 'Enter Container Registry Name:'
$AksName = Read-Host -Prompt 'Enter AKS Instance Name:'

az group create `
  --name $ResourceGroupName `
  --location eastus

Write-Host "Resource group created!"
Write-Host "Creating container registry!"

$response = az acr create `
  --resource-group $ResourceGroupName `
  --name $RegistryName `
  --sku Basic

Write-Host $response
Write-Host "Login Server: $response.loginServer"

Write-Host "Registry created, time to log in!"

az acr login --name $RegistryName

Write-Host "Logged in, creating AKS"

az aks create `
  -g $ResourceGroupName `
  -n $AksName `
  --node-count 2 `
  --enable-addons http_application_routing `
  --dns-name-prefix contoso-kubernetes-$RANDOM `
  --location eastus `
  --attach-acr $RegistryName `
  --generate-ssh-keys `
  --node-vm-size Standard_B2s

Write-Host "AKS created, logging into AKS"

#Only needed if kubectl is not already installed
az aks install-cli

Write-Host "Getting credentials"

az aks get-credentials --resource-group $ResourceGroupName --name $AksName

$loginServer = az acr list --resource-group myResourceGroup --query "[].{acrLoginServer:loginServer}" --output table

Write-Host "Login Server Name: $loginServer"

Read-Host -Prompt 'Got it?'

kubectl get nodes

# $FunctionAppPlanName = -join ($functionAppName, "-plan")

# $Region = "eastus"

# $script = "$PSScriptRoot\create-resource-group.ps1"
# & $script -ResourceGroupname $ResourceGroupName -Region $Region

# $script = "$PSScriptRoot\create-storage.ps1"
# &  $script -ResourceGroupname $ResourceGroupName -Region $Region -StorageAccountName $StorageAccountName

# #Write-Host "Creating Function App Plan"
# #az functionapp plan create --resource-group $ResourceGroupName --name $FunctionAppPlanName --location eastus --sku Y1

# Write-Host "Creating Function App"
# # Function with specified plan
# #az functionapp create --name $FunctionAppName --storage-account $StorageAccountName --resource-group $ResourceGroupName --plan $FunctionAppPlanName --functions-version 2

# # Function with Consumption Plan
# az functionapp create --name $FunctionAppName --storage-account $StorageAccountName --resource-group $ResourceGroupName --consumption-plan-location $Region --functions-version 2

# #--deployment-container-image-name $FunctionContainerImageName 

# Write-Host "Getting storage connection string"
# $StorageString = az storage account show-connection-string --resource-group $ResourceGroupName --name $StorageAccountName --query connectionString --output tsv

# Write-Host $StorageString

# az functionapp config appsettings set --name $FunctionAppName --resource-group $ResourceGroupName --settings AzureWebJobsStorage=$StorageString

# Write-Host "All done!"