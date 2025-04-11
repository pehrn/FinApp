using FinApp.Api.Dtos.Account;
using FinApp.Api.Interfaces;
using FinApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinApp.Api.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<AppUser> _signInManager;

    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());
        
        if (user == null) return Unauthorized("User not found");
        
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
        
        if (!result.Succeeded) return Unauthorized("Username or password is incorrect");

        return Ok(
            new NewUserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
            });
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