namespace TMA.Models
{
    public class UserWorkspace
    {
        public int Id { get; set; }
        public User User { get; set; }
        public Workspace Workspace { get; set; }
    }
}
