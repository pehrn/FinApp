using Microsoft.AspNetCore.Identity;

namespace FinApp.Api.Models;

public class AppUser : IdentityUser
{
    public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    public string AboutMe { get; set; }
    public string Position { get; set; }
}