using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Stock;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Tests.ControllerTests;

public class StockControllerTests
{
    [Fact]
    public async Task GetAllStocks_ReturnsAllStocks()
    {
        // Arrange
        var count = 5;
        var fakeStocks = A.CollectionOfDummy<Stock>(count).AsEnumerable();
        var dataStore = A.Fake<IStockRepository>();
        A.CallTo(() => dataStore.GetAllAsync()).Returns(fakeStocks.ToList());
        var controller = new StockController(dataStore);
        
        // Act
        var actionResult = await controller.GetAll();
            
        // Assert
        var result = actionResult as OkObjectResult;
        Assert.NotNull(result);
        
        var stocks = result.Value as IEnumerable<StockDto>;
        Assert.NotNull(stocks);
        Assert.Equal(count, stocks.Count());
    }

    [Fact]
    public async Task GetStockById_ReturnsStock()
    {
        // Arrange
        // var count = 5;
        // var id = 2;
        // var fakeStocks = A.CollectionOfDummy<Stock>(count).AsEnumerable();
        // var dataStore = A.Fake<IStockRepository>();
        // A.CallTo(() => dataStore.GetByIdAsync(id)).Returns(fakeStocks.FirstOrDefault());
        // var controller = new StockController(dataStore);
        //
        // // Act
        // var actionResult = await controller.GetById(id);
        //
        // // Assert
        // var result = actionResult as OkObjectResult;



    }
}