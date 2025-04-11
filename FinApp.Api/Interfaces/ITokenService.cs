using FinApp.Api.Models;

namespace FinApp.Api.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser user);
}