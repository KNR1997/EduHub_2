using Server.Api.Dtos;
using Server.Api.Entities;

namespace Server.Api.Mapping;

public static class WorkspaceMapping
{
    // public static Workspace ToEntity(this CreateGameDto game)
    // {
    //     return new Game()
    //     {
    //         Name = game.Name,
    //         GenreId = game.GenreId,
    //         Price = game.Price,
    //         ReleaseDate = game.ReleaseDate
    //     };
    // }

    // public static Game ToEntity(this UpdateGameDto game, int id)
    // {
    //     return new Game()
    //     {
    //         Id = id,
    //         Name = game.Name,
    //         GenreId = game.GenreId,
    //         Price = game.Price,
    //         ReleaseDate = game.ReleaseDate
    //     };
    // }

    public static WorkspaceSummaryDto ToWorkspaceSummaryDto(this Workspace workspace)
    {
        return new(
            workspace.Id,
            workspace.Name,
            workspace.User!.Username
        );
    }

    // public static GameDetailsDto ToGameDetailsDto(this Game game)
    // {
    //     return new(
    //         game.Id,
    //         game.Name,
    //         game.GenreId,
    //         game.Price,
    //         game.ReleaseDate
    //     );
    // }
}