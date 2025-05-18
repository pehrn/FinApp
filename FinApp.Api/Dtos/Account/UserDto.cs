using FinApp.Api.Models;

namespace FinApp.Api.Dtos.Account;

public class UserDto
{
    public List<Models.Stock> Portfolio { get; set; } = new List<Models.Stock>();
    public string UserName { get; set; }
    public string Email { get; set; }
}