using Microsoft.Azure.ServiceBus;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace Service.Bus.Clients
{
    internal static class ConcurrentDictionaryExtensions
    {
        internal static T AddOrReplaceIfClosed<T>(this ConcurrentDictionary<string, T> dictionary, string key, Func<T> createEntityClosure)
        {
            return dictionary.AddOrUpdate(
                key,
                createEntityClosure(),
                (keyRef, existingSender) =>
                {
                    if (IsObjectClosed(existingSender))
                    {
                        return createEntityClosure();
                    }

                    return existingSender;
                }
            );
        }

        private static bool IsObjectClosed<T>(T existingSender)
        {
            if (existingSender == null)
            {
                return true;
            }

            if (existingSender is IClientEntity clientEntityRef)
            {
                return clientEntityRef.IsClosedOrClosing;
            }
            else if (existingSender is IMessagePublisher publisherRef)
            {
                return publisherRef.IsClosedOrClosing;
            }

            return false;
        }
    }
}
