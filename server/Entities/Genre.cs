
namespace Server.Api.Entities;

public class Genre
{
    public int Id { get; set; }
    public required string Name { get; set; }

    public static implicit operator Genre(string v)
    {
        throw new NotImplementedException();
    }
}