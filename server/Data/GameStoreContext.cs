using Microsoft.EntityFrameworkCore;
using Server.Api.Entities;

namespace Server.Api.Data;

public class GameStoreContext(DbContextOptions<GameStoreContext> options)
    : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();
    public DbSet<Genre> Genres => Set<Genre>();
    public DbSet<User> User => Set<User>();
    public DbSet<Workspace> Workspace => Set<Workspace>();
    public DbSet<Ticket> Ticket => Set<Ticket>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Genre>().HasData(
            new {Id = 1, Name = "Fighting"},
            new {Id = 2, Name = "RolePlaying"},
            new {Id = 3, Name = "Sports"},
            new {Id = 4, Name = "Racing"},
            new {Id = 5, Name = "Kids and Family"}
        );
        modelBuilder.Entity<User>().HasData(
            new {Id = 1, Username = "kethaka", Email = "kethakaranasinghe@gmail.com", Password = "password"}
        );
        modelBuilder.Entity<Workspace>().HasData(
            new {Id = 1, Name = "Workspace_1", UserId = 1},
            new {Id = 2, Name = "Workspace_2", UserId = 1}

        );
        modelBuilder.Entity<Ticket>().HasData(
            new {Id = 1, Title = "Develop_ui", Description= "description_1", Status = "To-do", UserId = 1}
        );
    }
}