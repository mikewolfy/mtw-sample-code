using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Concurrent;

namespace Service.Bus.Clients
{
    public class QueueClientFactory
    {
        private readonly IConfiguration _configuration;
        private readonly ConcurrentDictionary<string, IQueueClient> _queueClients = new ConcurrentDictionary<string, IQueueClient>();
        /// <summary>
        /// Constructor for QueueClientFactory
        /// </summary>
        /// <param name="configuration">Collection of deployment settings</param>
        public QueueClientFactory(
            IConfiguration configuration)
        {
            _configuration = configuration;
        }

        /// <summary>
        /// Gets a queue client, either by fetching a previously instanced queue client or creating a new one
        /// </summary>
        /// <param name="serviceBusConnectionStringName">The connection string name to access the Azure Service Bus connection string in the configuration</param>
        /// <param name="entityPath">The direct path to the entity</param>
        /// <param name="createNewQueueClient">Flag to create new Queue client always of check if one exists</param>
        /// <return>IQueueClient</return>
        public IQueueClient GetQueueClient(string serviceBusConnectionStringName, string entityPath, bool createNewQueueClient = false)
        {
            if (createNewQueueClient)
            {
                return InitializeQueueClient(_configuration[serviceBusConnectionStringName], entityPath);
            }

            var key = $"{serviceBusConnectionStringName}-{entityPath}";

            return _queueClients.AddOrReplaceIfClosed(key, () => InitializeQueueClient(_configuration[serviceBusConnectionStringName], entityPath));
        }

        internal virtual IQueueClient InitializeQueueClient(string serviceBusConnectionString, string entityPath)
        {
            return new QueueClient(serviceBusConnectionString, entityPath);
        }
    }
}
