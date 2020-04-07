using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CosmosClient
{
    public abstract class CosmosClientBase<TEntity> where TEntity: Resource
    {
        protected IDocumentClient _client { get; }
        protected Uri CollectionUri { get; }

        protected int MaxTake = 1000;

        public CosmosClientBase(IDocumentClient client, string databaseName, string collectionName)
        {
            _client = client;
            CollectionUri = UriFactory.CreateDocumentCollectionUri(databaseName, collectionName);
        }

        public async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> filter,
            PartitionKey partitionKey = null,
            int take = 200)
        {
            if (filter == null)
            {
                throw new ArgumentNullException(nameof(filter));
            }

            if (take > MaxTake)
            {
                throw new InvalidOperationException($"The maximum records that can be returned is '{MaxTake}'.");
            }

            if (take <= 0)
            {
                return Enumerable.Empty<TEntity>();
            }

            var results = _client
                .CreateDocumentQuery<TEntity>(
                    CollectionUri,
                    GetFeedOptions(take, partitionKey))
                .Where(filter)
                .AsDocumentQuery();

            var queryResult = await results.ExecuteNextAsync();

            return queryResult.Select(x => (TEntity)x);
        }

        public virtual async Task<TEntity> CreateAsync(TEntity entityToCreate)
        {
            if (entityToCreate == null)
            {
                throw new ArgumentNullException(nameof(entityToCreate));
            }

            var response = await _client.CreateDocumentAsync(CollectionUri, entityToCreate);

            return (TEntity)(dynamic)response.Resource;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entityToUpdate)
        {
            if (entityToUpdate == null)
            {
                throw new ArgumentNullException(nameof(entityToUpdate));
            }

            var response = await _client.ReplaceDocumentAsync(
                entityToUpdate.SelfLink,
                entityToUpdate,
                new RequestOptions()
                {
                    AccessCondition = GetAccessCondition(entityToUpdate),
                    PartitionKey = GetPartitionKey(entityToUpdate)
                })
                .ConfigureAwait(false);

            return (TEntity)(dynamic)response.Resource;
        }

        public virtual async Task DeleteAsync(TEntity entityToDelete)
        {
            if (entityToDelete == null)
            {
                throw new ArgumentNullException(nameof(entityToDelete));
            }

            await _client.DeleteDocumentAsync(
                entityToDelete.SelfLink,
                new RequestOptions
                {
                    PartitionKey = GetPartitionKey(entityToDelete)
                })
                .ConfigureAwait(false);
        }

        protected abstract PartitionKey GetPartitionKey(TEntity entity);

        protected virtual AccessCondition GetAccessCondition(TEntity entity)
        {
            return new AccessCondition()
            {
                Condition = entity.ETag,
                Type = AccessConditionType.IfMatch
            };
        }

        protected virtual FeedOptions GetFeedOptions(int take, PartitionKey partitionKey = null)
        {
            return new FeedOptions
            {
                EnableCrossPartitionQuery = partitionKey == null ? true : false,
                PartitionKey = partitionKey,
                MaxItemCount = take,
                PopulateQueryMetrics = true
            };
        }
    }
}
