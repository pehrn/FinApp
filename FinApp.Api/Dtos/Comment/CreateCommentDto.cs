using System.ComponentModel.DataAnnotations;

namespace FinApp.Api.Dtos.Comment;

public class CreateCommentDto
{
    [Required]
    [MinLength(3, ErrorMessage = "Title must be at least 3 characters long.")]
    [MaxLength(200, ErrorMessage = "Title must be no more than 200 characters long.")]
    public string Title { get; set; } = string.Empty;
    
    [Required]
    [MinLength(5, ErrorMessage = "Content must be at least 5 characters long.")]
    [MaxLength(300, ErrorMessage = "Content must be no more than 300 characters long.")]
    public string Content { get; set; } = string.Empty;
}