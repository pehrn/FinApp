using FinApp.Api.Data;
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
    
    public async Task<List<Comment>> GetAllAsync()
    {
        return await _context.Comments.ToListAsync();
    }

    public async Task<Comment?> GetByIdAsync(int id)
    {
        return await _context.Comments.FindAsync(id);
    }

    public async Task<Comment> CreateAsync(Comment commentModel)
    {
        await _context.Comments.AddAsync(commentModel);
        await _context.SaveChangesAsync();
        return commentModel;
    }
}