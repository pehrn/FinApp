using FinApp.Api.Models;

namespace FinApp.Api.Interfaces;

public interface IPortfolioRepository
{
    Task<List<Stock>> GetUserPortfolio(AppUser user);
}