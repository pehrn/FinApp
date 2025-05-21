using FinApp.Api.Dtos.Comment;
using FinApp.Api.Helpers;
using FinApp.Api.Models;

namespace FinApp.Api.Interfaces;

public interface ICommentRepository
{
    Task<List<Comment>> GetAllAsync(CommentQueryObject queryObect);
    Task<Comment?> GetByIdAsync(int id);
    Task<Comment> CreateAsync(Comment comment);
    Task<Comment?> UpdateAsync(int id, Comment commentModel);
    Task<Comment?> DeleteAsync(int id);
    Task<List<CommentDto>> GetUserComments(AppUser user);
}