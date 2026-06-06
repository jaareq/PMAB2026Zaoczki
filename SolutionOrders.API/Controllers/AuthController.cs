using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionOrders.API.Models;
using SolutionOrders.API.Models.Data;

namespace SolutionOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.AppUsers
                .FirstOrDefaultAsync(u =>
                    u.Email == request.Email &&
                    u.Password == request.Password &&
                    u.IsActive);

            if (user == null)
            {
                return Unauthorized("Nieprawidłowy email lub hasło");
            }

            return Ok(new
            {
                user.IdAppUser,
                user.Name,
                user.Email,
                user.Role
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var emailExists = await _context.AppUsers
                .AnyAsync(u => u.Email == request.Email);

            if (emailExists)
            {
                return BadRequest("Użytkownik z takim adresem email już istnieje");
            }

            var user = new AppUser
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = "User",
                IsActive = true
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                user.IdAppUser,
                user.Name,
                user.Email,
                user.Role
            });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}