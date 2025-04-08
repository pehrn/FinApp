using System.ComponentModel.DataAnnotations;

namespace FinApp.Api.Dtos.Stock;

public class CreateStockRequestDto
{
    [Required]
    [MaxLength(10, ErrorMessage = "Symbol must be no more than 10 characters long.")]
    public string Symbol { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(10, ErrorMessage = "Company name must be no more than 10 characters long.")]
    public string CompanyName { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 1_000_000_000, ErrorMessage = "Price must be between 1 and 1T.")]
    public decimal Purchase { get; set; }
    
    [Required]
    [Range(0.001, 100)]
    public decimal LastDiv { get; set; }
    
    [Required]
    [MaxLength(10, ErrorMessage = "Industry must be no more than 10 characters long.")]
    public string Industry { get; set; } = string.Empty;
    
    [Required]
    [Range(1, 5_000_000_000, ErrorMessage = "MarketCap must be between 1 and 5T.")]
    public long MarketCap { get; set; }

}