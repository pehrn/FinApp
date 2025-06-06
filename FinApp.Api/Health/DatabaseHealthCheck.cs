using FinApp.Api.Data;
using FinApp.Api.Interfaces;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace FinApp.Api.Health;

public class DatabaseHealthCheck : IHealthCheck
{
    private readonly DbConnectionFactory _dbConnectionFactory;

    public DatabaseHealthCheck(DbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = new CancellationToken())
    {
        try
        {
            using var connection = await _dbConnectionFactory.CreateConnectionAsync();
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";
            command.ExecuteScalar();
            return HealthCheckResult.Healthy();
        }
        catch (Exception e)
        {
            return HealthCheckResult.Unhealthy(exception: e);
        }
    }
}