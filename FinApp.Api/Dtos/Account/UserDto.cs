using FinApp.Api.Models;

namespace FinApp.Api.Dtos.Account;

public class UserDto
{
    public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    public string UserName { get; set; }
    public string Email { get; set; }
}