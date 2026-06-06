using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionOrders.API.Models;
using SolutionOrders.API.Models.Data;

namespace SolutionOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReview(CreateReviewRequest request)
        {
            var bookExists = await _context.Books.AnyAsync(b => b.IdBook == request.IdBook);

            if (!bookExists)
            {
                return BadRequest("Nie znaleziono książki");
            }

            if (request.Rating < 1 || request.Rating > 5)
            {
                return BadRequest("Ocena musi być od 1 do 5");
            }

            var review = new Review
            {
                IdBook = request.IdBook,
                Content = request.Content,
                Rating = request.Rating,
                IsActive = true
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                review.IdReview,
                review.IdBook,
                review.Content,
                review.Rating,
                review.IsActive
            });
        }
    }

    public class CreateReviewRequest
    {
        public int IdBook { get; set; }
        public string Content { get; set; } = string.Empty;
        public int Rating { get; set; }
    }
}