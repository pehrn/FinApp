using FinApp.Api.Dtos.Account;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinApp.Api.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;

    public AccountController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
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
                
            return Ok("User created successfully");
        }
        catch (Exception e)
        {
            return StatusCode(500, e);
        }
    }
}