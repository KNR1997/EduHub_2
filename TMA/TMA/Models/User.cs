using Microsoft.AspNetCore.Identity;

namespace TMA.Models
{
    public class User : IdentityUser
    {
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<Workspace> Workspaces { get; set; }
    }
}
      