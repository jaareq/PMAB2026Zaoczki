using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SolutionOrders.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBookCategoriesRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookBookCategories",
                columns: table => new
                {
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    IdBookCategory = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookBookCategories", x => new { x.IdBook, x.IdBookCategory });
                    table.ForeignKey(
                        name: "FK_BookBookCategories_BookCategories_IdBookCategory",
                        column: x => x.IdBookCategory,
                        principalTable: "BookCategories",
                        principalColumn: "IdBookCategory",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookBookCategories_Books_IdBook",
                        column: x => x.IdBook,
                        principalTable: "Books",
                        principalColumn: "IdBook",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BookCategories",
                columns: new[] { "IdBookCategory", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, true, "Fantasy" },
                    { 2, true, "Przygodowe" }
                });

            migrationBuilder.InsertData(
                table: "BookBookCategories",
                columns: new[] { "IdBook", "IdBookCategory" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 1 },
                    { 2, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookBookCategories_IdBookCategory",
                table: "BookBookCategories",
                column: "IdBookCategory");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookBookCategories");

            migrationBuilder.DeleteData(
                table: "BookCategories",
                keyColumn: "IdBookCategory",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "BookCategories",
                keyColumn: "IdBookCategory",
                keyValue: 2);
        }
    }
}
