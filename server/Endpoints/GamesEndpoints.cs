using Server.Api.Entities;
using Server.Api.Repository;

namespace Server.Api.Endpoints;

public static class GamesEndPoints
{
    const string GetGameEndpointName = "GetGame";

    public static RouteGroupBuilder MapGamesEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/games").WithParameterValidation();

        group.MapGet("/", GetAllGames);
        group.MapGet("/{id}", GetGame).WithName(GetGameEndpointName);
        group.MapPost("/", CreateGame);
        group.MapPut("/{id}", UpdateGame);
        group.MapDelete("/{id}", DeleteGame);

        return group;
    }

    private static async Task<IResult> GetAllGames(IGamesRepository repository)
    {
        var games = await repository.GetAllAsync();
        return Results.Ok(games);
    }

    private static async Task<IResult> GetGame(IGamesRepository repository, int id)
    {
        var game = await repository.GetAsync(id);

        if (game is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(game);
    }

    private static async Task<IResult> CreateGame(IGamesRepository repository, Game game)
    {
        await repository.CreateAsync(game);
        return Results.CreatedAtRoute(GetGameEndpointName, new { id = game.Id }, game);
    }

    private static async Task<IResult> UpdateGame(IGamesRepository repository, int id, Game updateGame)
    {
        var existingGame = await repository.GetAsync(id);

        if (existingGame is null)
        {
            return Results.NotFound();
        }

        // Update logic...

        await repository.UpdateAsync(existingGame);

        return Results.NoContent();
    }

    private static async Task<IResult> DeleteGame(IGamesRepository repository, int id)
    {
        var game = await repository.GetAsync(id);

        if (game is not null)
        {
            await repository.DeleteAsynce(id);
        }

        return Results.NoContent();
    }
}