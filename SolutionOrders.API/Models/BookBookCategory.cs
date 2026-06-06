namespace SolutionOrders.API.Models
{
    public class BookBookCategory
    {
        public int IdBook { get; set; }
        public Book? Book { get; set; }

        public int IdBookCategory { get; set; }
        public BookCategory? BookCategory { get; set; }
    }
}
