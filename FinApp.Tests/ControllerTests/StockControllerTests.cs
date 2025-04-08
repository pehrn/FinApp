using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Stock;
using FinApp.Api.Helpers;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Tests.ControllerTests;

public class StockControllerTests
{
    private readonly IStockRepository _stockRepo;
    
    public StockControllerTests()
    {
        _stockRepo = A.Fake<IStockRepository>();
    }

    [Fact]
    public async Task StockController_GetAll_ReturnOk()
    {
        // Arrage
        var stocks = A.Fake<ICollection<Stock>>();
        var stocksList = A.Fake<List<Stock>>();
        var query = A.Fake<QueryObject>();
        
        A.CallTo(() => _stockRepo.GetAllAsync(query)).Returns(stocksList);
        
        var controller = new StockController(_stockRepo);
    
        // Act
        var result = await controller.GetAll(query);
    
        // Assert
        result.Should().NotBeNull(); 
        result.Should().BeOfType<OkObjectResult>();
    }
    
    [Fact]
    public async Task StockController_GetAll_ReturnsAllStocks()
    {
        // Arrange
        var count = 5;
        var fakeStocks = A.CollectionOfDummy<Stock>(count).AsEnumerable();
        var dataStore = A.Fake<IStockRepository>();
        var query = A.Fake<QueryObject>();

        A.CallTo(() => dataStore.GetAllAsync(query)).Returns(fakeStocks.ToList());
        var controller = new StockController(dataStore);
        
        // Act
        var actionResult = await controller.GetAll(query);
            
        // Assert
        var result = actionResult as OkObjectResult;
        Assert.NotNull(result);
        
        var stocks = result.Value as IEnumerable<StockDto>;
        Assert.NotNull(stocks);
        Assert.Equal(count, stocks.Count());
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task StockController_GetAll_FilterBySymbol_ReturnsSpecificStock()
    {
        // todo
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task StockController_GetAll_FilterByCompanyName_ReturnsSpecificStock()
    {
        // todo
    }

    [Fact(Skip = "Not implemented yet")]
    public async Task StockController_GetById_ReturnsSpecificStock()
    {
        // todo
    }
    
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_GetById_IdNotAnInt_Returns404()
    {
        
    }
    
    [Fact]
    public async Task StockController_Create_ReturnCreatedAtActionResult()
    {
        // Arrange
        var createStockDto = A.Fake<CreateStockRequestDto>();
        var stock = A.Fake<Stock>();
        
        A.CallTo(() => _stockRepo.CreateAsync(stock)).Returns(stock);
        
        var controller = new StockController(_stockRepo);

        // Act
        var result = await controller.Create(createStockDto);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<CreatedAtActionResult>();
    }
}