using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CosmosClientv2
{
    public interface IPersonRepository
    {
        Task<PersonEntity> GetPersonByIdAsync(string Id);
        Task<PersonEntity> CreatePersonAsync(PersonEntity person);
    }
}
