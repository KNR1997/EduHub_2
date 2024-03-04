using TMA.Data;
using TMA.Interfaces;
using TMA.Models;

namespace TMA.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public User GetUser(string userName)
        {
            // Query the database to find the user by username
            var user = _context.Users.FirstOrDefault(u => u.UserName == userName);

            return user;
        }
    }
}
