namespace Server.Api.Entities;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public List<Workspace>? Workspaces {get; set;}
    public List<Ticket>? Tickets {get; set;}
}