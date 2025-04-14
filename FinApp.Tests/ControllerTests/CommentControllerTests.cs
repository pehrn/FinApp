using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Comment;
using FinApp.Api.Dtos.Stock;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Tests.ControllerTests;

public class CommentControllerTests
{
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;
    private readonly UserManager<AppUser> _appUser;
    private readonly IFMPService _fmpService;
    
    public CommentControllerTests()
    {
        _fmpService = A.Fake<IFMPService>();
        _commentRepo = A.Fake<ICommentRepository>();
        _stockRepo = A.Fake<IStockRepository>();
        _appUser = A.Fake<UserManager<AppUser>>();
    }
    
    [Fact]
    public async Task CommentController_GetAll_ReturnsOk()
    {
        // Arrange
        var comments = A.Fake<ICollection<CommentDto>>();
        var commentsList = A.Fake<List<CommentDto>>();
        
        // Act
        
        // Assert
    }

    [Fact]
    public async Task CommentController_Create_StockDoesNotExist_ReturnsBadRequest()
    {
        // Arrange
        var symbol = "AAPL";
        var comment = A.Fake<Comment>();
        var commentDto = A.Fake<CreateCommentDto>();
        A.CallTo(() => _commentRepo.CreateAsync(comment)).Returns(comment);

        var controller = new CommentController(_commentRepo, _stockRepo, _appUser, _fmpService);

        // Act
        var result = await controller.Create(symbol, commentDto);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<BadRequestObjectResult>();
        
        var errorMesage = result as BadRequestObjectResult;
        errorMesage.Value.Should().Be("Stock does not exist");
    }

    [Fact(Skip = "Needs mocked stock")]
    public async Task CommentController_Create_ReturnCreatedAtActionResult()
    {
        // TODO: Needs existing stock
        
        // Arrange
        var symbol = "AAPL";
        var comment = A.Fake<Comment>();
        var appUser = A.Fake<AppUser>();
        var commentDto = A.Fake<CreateCommentDto>();
        A.CallTo(() => _commentRepo.CreateAsync(comment)).Returns(comment);
        
        var controller = new CommentController(_commentRepo, _stockRepo, _appUser, _fmpService);
        
        // Act
        var result = await controller.Create(symbol, commentDto);
        
        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<CreatedAtActionResult>();
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Create_TitleTooShort_ThrowsError()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Create_TitleTooLong_ThrowsError()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Create_ContentTooShort_ThrowsError()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Create_ContentTooLong_ThrowsError()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_GetById_ReturnsOk()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_GetById_IdNotAnInt_Returns404()
    {
        
    }

    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Update_CommentUpdated()
    {
        
    }
    
    [Fact(Skip = "Not implemented yet")]
    public async Task CommentController_Delete_CommentDeleted()
    {
        
    }
    
}