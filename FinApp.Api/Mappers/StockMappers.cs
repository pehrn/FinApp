using FinApp.Api.Dtos.Stock;
using FinApp.Api.Models;

namespace FinApp.Api.Mappers;

public static class StockMappers
{
    public static StockDto ToStockDto(this Stock stockModel)
    {
        return new StockDto()
        {
            Id = stockModel.Id,
            Symbol = stockModel.Symbol,
            CompanyName = stockModel.CompanyName,
            Industry = stockModel.Industry,
            LastDiv = stockModel.LastDiv,
            MarketCap = stockModel.MarketCap,
            Purchase = stockModel.Purchase,
            Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
        };
    }

    public static Stock ToStockFromCreateDto(this CreateStockRequestDto stockDto)
    {
        return new Stock
        {
            Symbol = stockDto.Symbol,
            CompanyName = stockDto.CompanyName,
            Industry = stockDto.Industry,
            LastDiv = stockDto.LastDiv,
            MarketCap = stockDto.MarketCap,
            Purchase = stockDto.Purchase
        };
    }
    
    public static Stock ToStockFromFMP(this FMPStock fmpStock)
    {
        return new Stock
        {
            Symbol = fmpStock.Symbol,
            CompanyName = fmpStock.CompanyName,
            Industry = fmpStock.Industry,
            LastDiv = fmpStock.LastDividend,
            MarketCap = fmpStock.MarketCap,
            Purchase = (decimal)fmpStock.Price
        };
    }

}