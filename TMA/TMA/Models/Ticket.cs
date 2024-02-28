namespace TMA.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string status { get; set; }
        public User user { get; set; }
        public Workspace Workspace { get; set; }
    }
}
