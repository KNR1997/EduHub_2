using Microsoft.EntityFrameworkCore;
using Server.Api.Data;
using Server.Api.Dtos;
using Server.Api.Mapping;

namespace Server.Api.Endpoints;

public static class WorkspaceEndPoints
{
    const string GetWorkspaceEndpointName  = "GetWorkspace";

    public static RouteGroupBuilder MapWorkspaceEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("workspaces").WithParameterValidation();

        group.MapGet("/", GetWorkspaces);
        // group.MapGet("/{id}", GetWorkspace).WithName(GetWorkspaceEndpointName);
        // group.MapPost("/", CreatWorkspace);
        // group.MapPut("/{id}", UpdateWorkspace);
        // group.MapDelete("/{id}", DeleteWorkspace);

        return group;
    }

    private static IResult GetWorkspaces(GameStoreContext dbContext)
    {
        var workspaces = dbContext.Workspace
            .Include(workspace => workspace.User)
            .Select(workspace => workspace.ToWorkspaceSummaryDto())
            .AsNoTracking();

        return Results.Ok(workspaces);
    }

    // private static IResult GetWorkspace(int id, GameStoreContext dbContext)
    // {
    //     var game = dbContext.Games.Find(id);

    //     return game is null
    //         ? Results.NotFound()
    //         : Results.Ok(game.ToGameDetailsDto());
    // }

    // private static IResult CreatWorkspace(CreateGameDto newGame, GameStoreContext dbContext)
    // {
    //     var game = newGame.ToEntity();

    //     dbContext.Games.Add(game);
    //     dbContext.SaveChanges();

    //     return Results.CreatedAtRoute(
    //         GetGameEndpointName,
    //         new { id = game.Id },
    //         game.ToGameDetailsDto());
    // }

    // private static IResult UpdateWorkspace(int id, UpdateGameDto updatedGame, GameStoreContext dbContext)
    // {
    //     var existingGame = dbContext.Games.Find(id);

    //     if (existingGame is null)
    //     {
    //         return Results.NotFound();
    //     }

    //     dbContext.Entry(existingGame)
    //             .CurrentValues
    //             .SetValues(updatedGame.ToEntity(id));

    //     dbContext.SaveChanges();

    //     return Results.NoContent();
    // }

    // private static IResult DeleteWorkspace(int id, GameStoreContext dbContext)
    // {
    //     dbContext.Games
    //         .Where(game => game.Id == id)
    //         .ExecuteDelete();

    //     return Results.NoContent();
    // }

}