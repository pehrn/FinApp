using FinApp.Api.Interfaces;
using FinApp.Api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Sprache;

namespace FinApp.Api.Controllers;

[Route("api/comment")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ICommentRepository _commentRepo;

    public CommentController(ICommentRepository commentRepo)
    {
        _commentRepo = commentRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentRepo.GetAllAsync();

        var commentsDto = comments.Select(s => s.ToCommentDto());
        
        return Ok(commentsDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync([FromRoute] int id)
    {
        var comment = await _commentRepo.GetByIdAsync(id);
        
        if (comment == null) return NotFound();
        
        return Ok(comment.ToCommentDto());
    }
}