using FinApp.Api.Dtos.Stock;
using FinApp.Api.Interfaces;
using FinApp.Api.Mappers;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;

namespace FinApp.Api.Service;

public class FMPService : IFMPService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    
    public FMPService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }
    
    public async Task<Stock> FindStockBySymbolAsync(string symbol)
    {
        try
        {
            var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_config["FMPKey"]}");
            
            if (!result.IsSuccessStatusCode) return null;

            var content = await result.Content.ReadAsStringAsync();
            
            var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
            var stock = tasks[0];
            
            if (stock == null) return null;

            return stock.ToStockFromFMP();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}