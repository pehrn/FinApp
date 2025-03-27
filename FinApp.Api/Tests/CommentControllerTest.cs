using FakeItEasy;
using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Comment;
using FinApp.Api.Dtos.Stock;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Sprache;
using Xunit;

namespace FinApp.Api.Tests;

public class CommentControllerTest
{
    [Fact]
    public async Task GetAllComments_ReturnsAllComments()
    {
        // Arrange
        var count = 3;
        var fakeComments = A.CollectionOfDummy<Comment>(count).AsEnumerable();
        var dataStore = A.Fake<ICommentRepository>();
        A.CallTo(() => dataStore.GetAllAsync()).Returns(fakeComments.ToList());
        var controller = new CommentController(dataStore);
        
        // Act
        var actionResult = await controller.GetAll();
            
        // Assert
        var result = actionResult as OkObjectResult;
        Assert.NotNull(result);
        
        var comments = result.Value as IEnumerable<CommentDto>;
        Assert.NotNull(comments);
        Assert.Equal(count, comments.Count());
    }
}