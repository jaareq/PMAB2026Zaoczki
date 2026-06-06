namespace SolutionOrders.API.Models
{
    public class BookOrderItem
    {
        public int IdBookOrderItem { get; set; }

        public int IdBookOrder { get; set; }

        public BookOrder? BookOrder { get; set; }

        public int IdBook { get; set; }

        public Book? Book { get; set; }

        public int Quantity { get; set; }

        public bool IsActive { get; set; }
    }
}
