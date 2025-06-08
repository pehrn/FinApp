using FinApp.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinApp.Api.Extensions;

public static class Extensions
{
    public static void ApplyMigrations(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

        dbContext.Database.Migrate();
    }
}