namespace TMA.Models
{
    public class Workspace
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public User Owner { get; set; }
        public ICollection<UserWorkspace> UserWorkspaces { get; set; }
    }
}
