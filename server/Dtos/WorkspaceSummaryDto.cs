namespace Server.Api.Dtos;

public record class WorkspaceSummaryDto(
    int Id,
    string Name,
    string User
);