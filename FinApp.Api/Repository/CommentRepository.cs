using FinApp.Api.Data;
using FinApp.Api.Dtos.Comment;
using FinApp.Api.Helpers;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinApp.Api.Repository;

public class CommentRepository : ICommentRepository
{
    private ApplicationDBContext _context;
    
    public CommentRepository(ApplicationDBContext context)
    {
        _context = context;
    }
    
    public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
    {
        var comments = _context.Comments.Include(a => a.AppUser).AsQueryable();
        
        if (!string.IsNullOrWhiteSpace(queryObject.Symbol)) comments = comments.Where(s => s.Stock.Symbol == queryObject.Symbol);

        if (queryObject.IsDescending) comments = comments.OrderByDescending(c => c.CreatedOn);
        
        return await comments.ToListAsync();
    }

    public async Task<Comment?> GetByIdAsync(int id)
    {
        return await _context.Comments.Include(a => a.AppUser).FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Comment> CreateAsync(Comment commentModel)
    {
        await _context.Comments.AddAsync(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }

    public async Task<Comment?> UpdateAsync(int id, Comment commentModel)
    {
        var existingComment = await _context.Comments.FindAsync(id);

        if (existingComment == null) return null;
        
        existingComment.Title = commentModel.Title;
        existingComment.Content = commentModel.Content;
        
        await _context.SaveChangesAsync();
        
        return existingComment;
    }

    public async Task<Comment?> DeleteAsync(int id)
    {
        var commentModel = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
        
        if (commentModel == null) return null;
        
        _context.Comments.Remove(commentModel);
        await _context.SaveChangesAsync();
        
        return commentModel;
    }

    public async Task<List<CommentDto>> GetUserComments(AppUser user)
    {
        return await _context.Comments.Where(u => u.AppUserId == user.Id).Select(comment => new CommentDto
        {
            Id = comment.Id,
            Title = comment.Title,
            Content = comment.Content,
            StockId = comment.StockId,
        }).ToListAsync();
    }
}