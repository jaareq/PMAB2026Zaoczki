namespace SolutionOrders.API.Models
{
    public class Review
    {
        public int IdReview { get; set; }

        public string Content { get; set; } = string.Empty;

        public int Rating { get; set; }

        public int IdBook { get; set; }

        public Book? Book { get; set; }

        public bool IsActive { get; set; }
    }
}
