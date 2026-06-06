namespace SolutionOrders.API.Models
{
    public class Book
    {
        public int IdBook { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Pages { get; set; }

        public string Language { get; set; } = string.Empty;

        public int IdAuthor { get; set; }

        public Author? Author { get; set; }

        public bool IsActive { get; set; }

        public int? IdPublisher { get; set; }

        public Publisher? Publisher { get; set; }

        public ICollection<Review> Reviews { get; set; } = new List<Review>();

        public ICollection<BookOrderItem> BookOrderItems { get; set; } = new List<BookOrderItem>();

        public ICollection<BookBookCategory> BookBookCategories { get; set; } = new List<BookBookCategory>();
    }
}
