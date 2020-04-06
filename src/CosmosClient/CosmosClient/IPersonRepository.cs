using System.Threading.Tasks;

namespace CosmosClient
{
    public interface IPersonRepository
    {
        Task<PersonEntity> CreateAsync(PersonEntity person);
        Task<PersonEntity> UpdateAsync(PersonEntity person);
        Task<PersonEntity> GetPersonAsync(string personId);
    }
}
