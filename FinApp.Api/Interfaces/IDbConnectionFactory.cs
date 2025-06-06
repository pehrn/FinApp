using System.Data.Common;

namespace FinApp.Api.Interfaces;

public interface IDbConnectionFactory
{
    Task<DbConnection> CreateConnectionAsync(CancellationToken cancellationToken = default);
}