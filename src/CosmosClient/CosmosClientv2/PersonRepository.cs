using Azure.Cosmos;
using Azure.Cosmos.Serialization;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CosmosClientv2
{
    public class PersonRepository : IPersonRepository
    {
        public Task<PersonEntity> CreatePersonAsync(PersonEntity person)
        {
            throw new NotImplementedException();
        }

        public Task<PersonEntity> GetPersonByIdAsync(string Id)
        {
            throw new NotImplementedException();
        }

        protected readonly CosmosClient _cosmosClient;
        protected readonly CosmosContainer _cosmosContainer;
        private bool _disposed;

        public PersonRepository(string endpoint, string authKey, string databaseId, string containerId)
        {
            var clientOptions = new CosmosClientOptions()
            {
                SerializerOptions = new CosmosSerializationOptions
                {
                    IgnoreNullValues = true,
                    Indented = false,
                    PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase,
                }
            };

            _cosmosClient = new CosmosClient(endpoint, authKey, clientOptions);
            _cosmosContainer = _cosmosClient.GetContainer(databaseId, containerId);
        }

        public async Task<PersonEntity> Add(PersonEntity PersonEntity)
        {
            ThrowIfDisposed();

            if (PersonEntity == null)
                throw new ArgumentNullException(nameof(PersonEntity));

            var response = await _cosmosContainer.CreateItemAsync(PersonEntity, new PartitionKey(PersonEntity.PartitionKey));

            return response.Value;
        }

        public async Task<PersonEntity> GetById(string id)
        {
            ThrowIfDisposed();

            var response = await _cosmosContainer.ReadItemAsync<PersonEntity>(id, new PartitionKey(id));

            return response.Value;
        }

        public async Task<PersonEntity> Update(PersonEntity PersonEntity)
        {
            ThrowIfDisposed();

            var response = await _cosmosContainer.ReplaceItemAsync(PersonEntity, PersonEntity.Id, new PartitionKey(PersonEntity.PartitionKey));

            return response.Value;
        }

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _cosmosClient.Dispose();
                }

                _disposed = true;
            }
        }

        private void ThrowIfDisposed()
        {
            if (_disposed)
            {
                throw new ObjectDisposedException($"Accessing {nameof(PersonRepository)} after it is disposed is invalid.");
            }
        }
    }
}
