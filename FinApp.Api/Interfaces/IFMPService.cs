using FinApp.Api.Models;

namespace FinApp.Api.Interfaces;

public interface IFMPService
{
    Task<Stock> FindStockBySymbolAsync(string symbol);
}