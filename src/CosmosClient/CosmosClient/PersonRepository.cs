using Microsoft.Azure.Documents;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace CosmosClient
{
    public class PersonRepository : CosmosClientBase<PersonEntity>, IPersonRepository
    {
        public PersonRepository(IDocumentClient documentClient, IConfiguration configuration): base(
            documentClient, configuration["DatabaseName"], configuration["PersonCollectionName"])
        { }

        public async Task<PersonEntity> GetPersonAsync(string personId)
        {
            try
            {
                var result = await GetAsync(x => x.Id == personId, new PartitionKey(new PersonEntity
                {
                    Id = personId
                }.PartitionKey));

                return result.FirstOrDefault();
            }
            catch (DocumentClientException e)
            {
                if (e.StatusCode == HttpStatusCode.NotFound)
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }
        }

        protected override PartitionKey GetPartitionKey(PersonEntity entity)
        {
            return new PartitionKey(entity.PartitionKey);
        }
    }
}
