namespace TMA.Models
{
    public class Workspace
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<User> User { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
    }
}
