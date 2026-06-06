using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SolutionOrders.API.Models;
using SolutionOrders.API.Models.Data;

namespace SolutionOrders.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books
                .Select(b => new
                {
                    b.IdBook,
                    b.Title,
                    b.Description,
                    b.Price,
                    b.Pages,
                    b.Language,
                    b.IdAuthor,
                    b.IdPublisher,
                    b.IsActive,
                    AuthorName = b.Author != null
                        ? b.Author.FirstName + " " + b.Author.LastName
                        : "",
                    PublisherName = b.Publisher != null
                        ? b.Publisher.Name
                        : "",
                    Categories = b.BookBookCategories
                        .Select(c => c.BookCategory.Name)
                        .ToList(),
                    AverageRating = b.Reviews.Any()
                        ? b.Reviews.Average(r => r.Rating)
                        : 0
                })
                .ToListAsync();

            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books
                .Where(b => b.IdBook == id)
                .Select(b => new
                {
                    b.IdBook,
                    b.Title,
                    b.Description,
                    b.Price,
                    b.Pages,
                    b.Language,
                    b.IdAuthor,
                    b.IdPublisher,
                    b.IsActive,
                    AuthorName = b.Author != null
                        ? b.Author.FirstName + " " + b.Author.LastName
                        : "",
                    PublisherName = b.Publisher != null
                        ? b.Publisher.Name
                        : "",
                    Categories = b.BookBookCategories
                        .Select(c => c.BookCategory.Name)
                        .ToList(),
                    CategoryIds = b.BookBookCategories
                        .Select(c => c.IdBookCategory)
                        .ToList(),
                    Reviews = b.Reviews
                        .Select(r => new
                        {
                            r.IdReview,
                            r.Content,
                            r.Rating
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> CreateBook(CreateBookRequest request)
        {
            var book = new Book
            {
                Title = request.Title,
                Description = request.Description,
                Price = request.Price,
                Pages = request.Pages,
                Language = request.Language,
                IdAuthor = request.IdAuthor,
                IdPublisher = request.IdPublisher,
                IsActive = true
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            foreach (var categoryId in request.IdBookCategories)
            {
                _context.BookBookCategories.Add(new BookBookCategory
                {
                    IdBook = book.IdBook,
                    IdBookCategory = categoryId
                });
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                book.IdBook,
                book.Title,
                book.Description,
                book.Price,
                book.Pages,
                book.Language,
                book.IdAuthor,
                book.IdPublisher,
                book.IsActive
            });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, UpdateBookRequest updatedBook)
        {
            if (id != updatedBook.IdBook)
            {
                return BadRequest();
            }

            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            book.Title = updatedBook.Title;
            book.Description = updatedBook.Description;
            book.Price = updatedBook.Price;
            book.Pages = updatedBook.Pages;
            book.Language = updatedBook.Language;
            book.IdAuthor = updatedBook.IdAuthor;
            book.IdPublisher = updatedBook.IdPublisher;
            book.IsActive = updatedBook.IsActive;

            var oldCategories = _context.BookBookCategories
                .Where(x => x.IdBook == id);

                        _context.BookBookCategories.RemoveRange(oldCategories);

            foreach (var categoryId in updatedBook.IdBookCategories)
            {
                _context.BookBookCategories.Add(new BookBookCategory
                {
                    IdBook = id,
                    IdBookCategory = categoryId
                });
            }

            await _context.SaveChangesAsync();

            return Ok(new
            {
                book.IdBook,
                book.Title,
                book.Description,
                book.Price,
                book.Pages,
                book.Language,
                book.IdAuthor,
                book.IdPublisher,
                book.IsActive
            });
        }
    }

    public class CreateBookRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Pages { get; set; }
        public string Language { get; set; } = string.Empty;
        public int IdAuthor { get; set; }
        public int? IdPublisher { get; set; }
        public List<int> IdBookCategories { get; set; } = new List<int>();
    }

    public class UpdateBookRequest
    {
        public int IdBook { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Pages { get; set; }
        public string Language { get; set; } = string.Empty;
        public int IdAuthor { get; set; }
        public int? IdPublisher { get; set; }
        public List<int> IdBookCategories { get; set; } = new List<int>();
        public bool IsActive { get; set; }
    }
}