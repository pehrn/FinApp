using FinApp.Api.Data;
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
    private readonly IPortfolioRepository _portfolioRepo;
    private readonly ApplicationDBContext _context;
    

    public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IPortfolioRepository portfolioRepo, ApplicationDBContext context)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
        _portfolioRepo = portfolioRepo;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        
        var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDto.Username.ToLower());
        
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

    [HttpGet("{userName}", Name = "GetUserByUserName")]
    public async Task<IActionResult> GetUserByUserName([FromRoute] string userName)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await _userManager.FindByNameAsync(userName);
        
        if (user == null) return NotFound();
        
        var userPortfolio = await _portfolioRepo.GetUserPortfolio(user);
        
        return Ok(
            new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Portfolio = userPortfolio
            });
    }

}