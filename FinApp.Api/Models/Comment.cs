using System.ComponentModel.DataAnnotations.Schema;

namespace FinApp.Api.Models;

[Table("Comments")]
public class Comment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int? StockId { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.Now.ToUniversalTime();
    public Stock? Stock { get; set; }
}