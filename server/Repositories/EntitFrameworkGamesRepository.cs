using Microsoft.EntityFrameworkCore;
using Server.Api.Data;
using Server.Api.Entities;

namespace Server.Api.Repository;

public class EntityFrameworkGamesRepository : IGamesRepository
{
    private readonly GameStoreContext dbContext;

    public EntityFrameworkGamesRepository(GameStoreContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task<IEnumerable<Game>> GetAllAsync()
    {
        return await dbContext.Games.AsNoTracking().ToListAsync();
    }

    public async Task<Game?> GetAsync(int id)
    {
        return await dbContext.Games.FindAsync(id);
    }

    public async Task CreateAsync(Game game)
    {
        dbContext.Games.Add(game);
        await dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Game updateGame)
    {
        dbContext.Update(updateGame);
        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsynce(int id)
    {
        await dbContext.Games.Where(game => game.Id == id)
                    .ExecuteDeleteAsync();
    }
}
