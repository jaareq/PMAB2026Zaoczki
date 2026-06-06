namespace SolutionOrders.API.Models
{
    public class Publisher
    {
        public int IdPublisher { get; set; }

        public string Name { get; set; } = string.Empty;

        public bool IsActive { get; set; }

        public ICollection<Book> Books { get; set; } = new List<Book>();
    }
}
