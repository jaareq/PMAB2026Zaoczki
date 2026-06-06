namespace SolutionOrders.API.Models
{
    public class AppUser
    {
        public int IdAppUser { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        public bool IsActive { get; set; }

        public ICollection<BookOrder> BookOrders { get; set; } = new List<BookOrder>();
    }
}
