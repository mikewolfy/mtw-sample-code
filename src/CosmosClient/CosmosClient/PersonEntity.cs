using Microsoft.Azure.Documents;
using Newtonsoft.Json;

namespace CosmosClient
{
    public class PersonEntity: Resource
    {
        [JsonProperty("partitionkey")]
        public string PartitionKey
        {
            get { return $"person:{Id}"; }
        }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
