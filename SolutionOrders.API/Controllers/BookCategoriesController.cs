using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionOrders.API.Models;
using SolutionOrders.API.Models.Data;

namespace SolutionOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookCategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookCategories()
        {
            var categories = await _context.BookCategories
               .Where(c => c.IsActive)
               .ToListAsync();
            return Ok(categories);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookCategory(BookCategory category)
        {
            category.IsActive = true;

            _context.BookCategories.Add(category);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                category.IdBookCategory,
                category.Name,
                category.IsActive
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookCategory(int id)
        {
            var category = await _context.BookCategories.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            category.IsActive = false;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}