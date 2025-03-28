namespace FinApp.Api.Models;

public class Comment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int? StockId { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.Now;
    public Stock? Stock { get; set; }
}