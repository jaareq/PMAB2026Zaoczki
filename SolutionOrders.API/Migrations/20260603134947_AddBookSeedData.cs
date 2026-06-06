using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SolutionOrders.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBookSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Authors",
                columns: new[] { "IdAuthor", "FirstName", "IsActive", "LastName" },
                values: new object[,]
                {
                    { 1, "Andrzej", true, "Sapkowski" },
                    { 2, "J.K.", true, "Rowling" }
                });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "IdBook", "Description", "IdAuthor", "IsActive", "Language", "Pages", "Price", "Title" },
                values: new object[,]
                {
                    { 1, "Przygody Geralta z Rivii", 1, true, "Polski", 332, 39.99m, "Wiedźmin: Ostatnie życzenie" },
                    { 2, "Pierwsza część serii Harry Potter", 2, true, "Polski", 320, 49.99m, "Harry Potter i Kamień Filozoficzny" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "IdBook",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Books",
                keyColumn: "IdBook",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "IdAuthor",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Authors",
                keyColumn: "IdAuthor",
                keyValue: 2);
        }
    }
}
