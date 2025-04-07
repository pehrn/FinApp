using FinApp.Api.Dtos.Comment;
using FinApp.Api.Interfaces;
using FinApp.Api.Mappers;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Api.Controllers;

[Route("api/comment")]
[ApiController]
public class CommentController : ControllerBase
{
    private readonly ICommentRepository _commentRepo;
    private readonly IStockRepository _stockRepo;

    public CommentController(ICommentRepository commentRepo, IStockRepository stockRepo)
    {
        _commentRepo = commentRepo;
        _stockRepo = stockRepo;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var comments = await _commentRepo.GetAllAsync();

        var commentsDto = comments.Select(s => s.ToCommentDto());
        
        return Ok(commentsDto);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var comment = await _commentRepo.GetByIdAsync(id);
        
        if (comment == null) return NotFound();
        
        return Ok(comment.ToCommentDto());
    }

    [HttpPost("{stockId}")]
    public async Task<IActionResult> Create([FromRoute] int stockId, CreateCommentDto commentDto)
    {
        if (!await _stockRepo.StockExists(stockId)) return BadRequest("Stock does not exist");

        var commentModel = commentDto.ToCommentFromCreate(stockId);

        await _commentRepo.CreateAsync(commentModel);
        
        return CreatedAtAction(nameof(GetById), new { id = commentModel.Id }, commentModel.ToCommentDto());
    }

    [HttpPut]
    [Route("{id}")]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCommentRequestDto updateDto)
    {
        var comment = await _commentRepo.UpdateAsync(id, updateDto.ToCommentFromUpdate());
        
        if (comment == null) return NotFound("Comment not found");
        
        return Ok(comment.ToCommentDto());
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var commentModel = await _commentRepo.DeleteAsync(id);
        
        if (commentModel == null) return NotFound("Comment not found");
        
        return Ok(commentModel);
    }
}