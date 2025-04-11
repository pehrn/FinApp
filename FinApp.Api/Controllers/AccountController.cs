using FinApp.Api.Dtos.Account;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Api.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        try
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);

            var appUser = new AppUser
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };
            
            var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

            if (!createdUser.Succeeded) return BadRequest(createdUser.Errors);
            
            var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                
            if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);
                
            return Ok(
                new NewUserDto
                {
                    UserName = appUser.UserName,
                    Email = appUser.Email,
                    Token = _tokenService.CreateToken(appUser)
                });
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }
}