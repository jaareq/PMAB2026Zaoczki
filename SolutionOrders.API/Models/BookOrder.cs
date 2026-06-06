namespace SolutionOrders.API.Models
{
    public class BookOrder
    {
        public int IdBookOrder { get; set; }

        public DateTime OrderDate { get; set; }

        public int IdAppUser { get; set; }

        public AppUser? AppUser { get; set; }

        public bool IsActive { get; set; }

        public ICollection<BookOrderItem> BookOrderItems { get; set; } = new List<BookOrderItem>();
    }
}
