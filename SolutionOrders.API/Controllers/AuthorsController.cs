using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionOrders.API.Models;
using SolutionOrders.API.Models.Data;

namespace SolutionOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _context.Authors
                .Where(a => a.IsActive)
                .ToListAsync();
            return Ok(authors);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAuthor(Author author)
        {
            author.IsActive = true;

            _context.Authors.Add(author);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                author.IdAuthor,
                author.FirstName,
                author.LastName,
                author.IsActive
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var author = await _context.Authors.FindAsync(id);

            if (author == null)
            {
                return NotFound();
            }

            author.IsActive = false;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}