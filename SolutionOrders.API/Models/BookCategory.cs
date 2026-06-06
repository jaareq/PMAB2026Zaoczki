namespace SolutionOrders.API.Models
{
    public class BookCategory
    {
        public int IdBookCategory { get; set; }

        public string Name { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public ICollection<BookBookCategory> BookBookCategories { get; set; } = new List<BookBookCategory>();
    }
}
