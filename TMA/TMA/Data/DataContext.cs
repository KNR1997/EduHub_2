using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TMA.Models;

namespace TMA.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DataContext(DbContextOptions options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> CustomUsers { get; set; }
        public DbSet<Workspace> Workspaces { get; set; }
        public DbSet<Ticket> Tasks { get; set; }

    }
}
