using TMA.Models;

namespace TMA.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string username);

        User GetUserByID(string userID);

    }
}
