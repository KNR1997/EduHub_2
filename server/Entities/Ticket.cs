namespace Server.Api.Entities;

public class Ticket
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string Status { get; set; }
    public int UserId { get; set; }
    public required User User { get; set; }
}