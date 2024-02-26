using Server.Api.Data;
using Server.Api.Endpoints;
using Server.Api.Repository;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IGamesRepository, EntityFrameworkGamesRepository>();

var connString = builder.Configuration.GetConnectionString("GameStore");
builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

app.MapGamesEndpoints();
app.MapWorkspaceEndpoints();

app.MigrateDb();

app.Run();
