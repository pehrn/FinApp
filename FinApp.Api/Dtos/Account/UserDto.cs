using FinApp.Api.Dtos.Comment;
using FinApp.Api.Models;

namespace FinApp.Api.Dtos.Account;

public class UserDto
{
    public List<Models.Stock> Portfolio { get; set; } = new List<Models.Stock>();
    public string UserName { get; set; }
    public string Email { get; set; }
    public List<CommentDto> Comments { get; set; } = new List<CommentDto>();
    public string AboutMe { get; set; }
    public string Position { get; set; }
}