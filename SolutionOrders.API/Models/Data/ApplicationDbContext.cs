using Microsoft.EntityFrameworkCore;

namespace SolutionOrders.API.Models.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
          : base(options)
        {
        }

        public DbSet<UnitOfMeasurement> UnitOfMeasurements { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<BookOrder> BookOrders { get; set; }
        public DbSet<BookOrderItem> BookOrderItems { get; set; }
        public DbSet<BookBookCategory> BookBookCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UnitOfMeasurement>(entity =>
            {
                entity.HasKey(e => e.IdUnitOfMeasurement);
                entity.Property(e => e.IsActive).IsRequired();
            });

            modelBuilder.Entity<Author>(entity =>
            {
                entity.HasKey(e => e.IdAuthor);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(e => e.IdBook);

                entity.Property(e => e.Price)
                    .HasColumnType("decimal(18,2)");

                entity.HasOne(e => e.Author)
                    .WithMany(a => a.Books)
                    .HasForeignKey(e => e.IdAuthor);

                entity.HasOne(e => e.Publisher)
                .WithMany(p => p.Books)
                .HasForeignKey(e => e.IdPublisher);
            });

            modelBuilder.Entity<BookCategory>(entity =>
            {
                entity.HasKey(e => e.IdBookCategory);
            });

            modelBuilder.Entity<Publisher>(entity =>
            {
                entity.HasKey(e => e.IdPublisher);
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(e => e.IdReview);

                entity.HasOne(e => e.Book)
                    .WithMany(b => b.Reviews)
                    .HasForeignKey(e => e.IdBook);
            });

            modelBuilder.Entity<AppUser>(entity =>
            {
                entity.HasKey(e => e.IdAppUser);
            });

            modelBuilder.Entity<BookOrder>(entity =>
            {
                entity.HasKey(e => e.IdBookOrder);

                entity.HasOne(e => e.AppUser)
                    .WithMany(u => u.BookOrders)
                    .HasForeignKey(e => e.IdAppUser);
            });

            modelBuilder.Entity<BookOrderItem>(entity =>
            {
                entity.HasKey(e => e.IdBookOrderItem);

                entity.HasOne(e => e.BookOrder)
                    .WithMany(o => o.BookOrderItems)
                    .HasForeignKey(e => e.IdBookOrder);

                entity.HasOne(e => e.Book)
                    .WithMany(b => b.BookOrderItems)
                    .HasForeignKey(e => e.IdBook);
            });

            modelBuilder.Entity<BookBookCategory>(entity =>
            {
                entity.HasKey(e => new { e.IdBook, e.IdBookCategory });

                entity.HasOne(e => e.Book)
                    .WithMany(b => b.BookBookCategories)
                    .HasForeignKey(e => e.IdBook);

                entity.HasOne(e => e.BookCategory)
                    .WithMany(c => c.BookBookCategories)
                    .HasForeignKey(e => e.IdBookCategory);
            });
            // Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(e => e.IdCategory);
                entity.Property(e => e.IsActive).IsRequired();
            });

            // Client
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.IdClient);
                entity.Property(e => e.IsActive).IsRequired();
            });

            // Worker
            modelBuilder.Entity<Worker>(entity =>
            {
                entity.HasKey(e => e.IdWorker);
                entity.Property(e => e.Login).IsRequired();
                entity.Property(e => e.IsActive).IsRequired();
            });

            // Item
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.IdItem);
                entity.Property(e => e.IdCategory).IsRequired();
                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");
                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 0)");
                entity.Property(e => e.IsActive).IsRequired();

                entity.HasOne(e => e.Category)
                    .WithMany(c => c.Items)
                    .HasForeignKey(e => e.IdCategory)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.UnitOfMeasurement)
                    .WithMany(u => u.Items)
                    .HasForeignKey(e => e.IdUnitOfMeasurement)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Order
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.IdOrder);

                entity.HasOne(e => e.Client)
                    .WithMany(c => c.Orders)
                    .HasForeignKey(e => e.IdClient)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Worker)
                    .WithMany(w => w.Orders)
                    .HasForeignKey(e => e.IdWorker)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // OrderItem
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(e => e.IdOrderItem);
                entity.Property(e => e.IdOrder).IsRequired();
                entity.Property(e => e.IdItem).IsRequired();
                entity.Property(e => e.Quantity).HasColumnType("decimal(18, 0)");
                entity.Property(e => e.IsActive).IsRequired();

                entity.HasOne(e => e.Order)
                    .WithMany(o => o.OrderItems)
                    .HasForeignKey(e => e.IdOrder)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Item)
                    .WithMany(i => i.OrderItems)
                    .HasForeignKey(e => e.IdItem)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Seed data - przykładowe dane
            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>().HasData(
                new Author
                {
                    IdAuthor = 1,
                    FirstName = "Andrzej",
                    LastName = "Sapkowski",
                    IsActive = true
                },
                new Author
                {
                    IdAuthor = 2,
                    FirstName = "J.K.",
                    LastName = "Rowling",
                    IsActive = true
                }
            );

            modelBuilder.Entity<Book>().HasData(
                new Book
                {
                    IdBook = 1,
                    Title = "Wiedźmin: Ostatnie życzenie",
                    Description = "Przygody Geralta z Rivii",
                    Price = 39.99m,
                    Pages = 332,
                    Language = "Polski",
                    IdAuthor = 1,
                    IdPublisher = 1,
                    IsActive = true
                },
                new Book
                {
                    IdBook = 2,
                    Title = "Harry Potter i Kamień Filozoficzny",
                    Description = "Pierwsza część serii Harry Potter",
                    Price = 49.99m,
                    Pages = 320,
                    Language = "Polski",
                    IdAuthor = 2,
                    IdPublisher = 1,
                    IsActive = true
                }
            );

            modelBuilder.Entity<Publisher>().HasData(
                new Publisher
                {
                    IdPublisher = 1,
                    Name = "SuperNOWA",
                    IsActive = true
                }
            );

            modelBuilder.Entity<Review>().HasData(
                new Review
                {
                    IdReview = 1,
                    Content = "Bardzo dobra książka, świetny klimat.",
                    Rating = 5,
                    IdBook = 1,
                    IsActive = true
                },
                new Review
                {
                    IdReview = 2,
                    Content = "Ciekawa historia i dobrze napisane postacie.",
                    Rating = 4,
                    IdBook = 2,
                    IsActive = true
                }
            );

            modelBuilder.Entity<BookCategory>().HasData(
                new BookCategory
                {
                    IdBookCategory = 1,
                    Name = "Fantasy",
                    IsActive = true
                },
                new BookCategory
                {
                    IdBookCategory = 2,
                    Name = "Przygodowe",
                    IsActive = true
                }
            );

            modelBuilder.Entity<BookBookCategory>().HasData(
                new BookBookCategory
                {
                    IdBook = 1,
                    IdBookCategory = 1
                },
                new BookBookCategory
                {
                    IdBook = 2,
                    IdBookCategory = 1
                },
                new BookBookCategory
                {
                    IdBook = 2,
                    IdBookCategory = 2
                }
            );

            modelBuilder.Entity<AppUser>().HasData(
                new AppUser
                {
                    IdAppUser = 1,
                    Name = "Administrator",
                    Email = "admin@test.pl",
                    Password = "admin",
                    Role = "Admin",
                    IsActive = true
                },
                new AppUser
                {
                    IdAppUser = 2,
                    Name = "Użytkownik",
                    Email = "user@test.pl",
                    Password = "user",
                    Role = "User",
                    IsActive = true
                }
            );
            // UnitOfMeasurement
            modelBuilder.Entity<UnitOfMeasurement>().HasData(
                new UnitOfMeasurement { IdUnitOfMeasurement = 1, Name = "szt", Description = "Sztuki", IsActive = true },
                new UnitOfMeasurement { IdUnitOfMeasurement = 2, Name = "kg", Description = "Kilogramy", IsActive = true },
                new UnitOfMeasurement { IdUnitOfMeasurement = 3, Name = "l", Description = "Litry", IsActive = true }
            );

            // Category
            modelBuilder.Entity<Category>().HasData(
                new Category { IdCategory = 1, Name = "Elektronika", Description = "Urządzenia elektroniczne", IsActive = true },
                new Category { IdCategory = 2, Name = "Żywność", Description = "Produkty spożywcze", IsActive = true }
            );

            // Client
            modelBuilder.Entity<Client>().HasData(
                new Client { IdClient = 1, Name = "Jan Kowalski", Address = "ul. Główna 1, Warszawa", PhoneNumber = "500-100-200", IsActive = true },
                new Client { IdClient = 2, Name = "Anna Nowak", Address = "ul. Kwiatowa 5, Kraków", PhoneNumber = "600-200-300", IsActive = true }
            );

            // Worker
            modelBuilder.Entity<Worker>().HasData(
                new Worker { IdWorker = 1, FirstName = "Piotr", LastName = "Kowalczyk", Login = "pkowalczyk", IsActive = true },
                new Worker { IdWorker = 2, FirstName = "Maria", LastName = "Wiśniewska", Login = "mwisnieska", IsActive = true }
            );

            // Item
            modelBuilder.Entity<Item>().HasData(
                new Item { IdItem = 1, Name = "Laptop Dell", Description = "Laptop Dell Inspiron 15", IdCategory = 1, Price = 3500, Quantity = 10, IdUnitOfMeasurement = 1, Code = "LAP001", IsActive = true },
                new Item { IdItem = 2, Name = "Monitor Samsung", Description = "Monitor 24 cale", IdCategory = 1, Price = 800, Quantity = 15, IdUnitOfMeasurement = 1, Code = "MON001", IsActive = true }
            );
        }
    }
}