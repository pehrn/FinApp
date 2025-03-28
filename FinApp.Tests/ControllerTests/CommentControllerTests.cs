using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Comment;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Tests.ControllerTests;

public class CommentControllerTests
{
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;
    
    public CommentControllerTests()
    {
        _commentRepo = A.Fake<ICommentRepository>();
        _stockRepo = A.Fake<IStockRepository>();
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
        var id = 1;
        var comment = A.Fake<Comment>();
        var commentDto = A.Fake<CreateCommentDto>();
        A.CallTo(() => _commentRepo.CreateAsync(comment)).Returns(comment);

        var controller = new CommentController(_commentRepo, _stockRepo);

        // Act
        var result = await controller.Create(id, commentDto);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<BadRequestObjectResult>();
        
        var errorMesage = result as BadRequestObjectResult;
        errorMesage.Value.Should().Be("Stock does not exist");
    }
}