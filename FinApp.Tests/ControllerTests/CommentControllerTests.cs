using FinApp.Api.Controllers;
using FinApp.Api.Dtos.Comment;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Tests.ControllerTests;

public class CommentControllerTests
{
    private readonly ICommentRepository _commentRepo;
    private readonly CommentController _controller;
    
    public CommentControllerTests()
    {
        _commentRepo = A.Fake<ICommentRepository>();
        _controller = A.Fake<CommentController>();
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
}