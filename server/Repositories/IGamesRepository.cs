using Server.Api.Entities;

namespace Server.Api.Repository;

public interface IGamesRepository
{
    Task CreateAsync(Game game);
    Task DeleteAsynce(int id);
    Task<Game?> GetAsync(int id);
    Task<IEnumerable<Game>> GetAllAsync();
    Task UpdateAsync(Game updateGame);
}