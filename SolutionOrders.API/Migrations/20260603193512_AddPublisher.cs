using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolutionOrders.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPublisher : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdPublisher",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Publishers",
                columns: table => new
                {
                    IdPublisher = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Publishers", x => x.IdPublisher);
                });

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "IdBook",
                keyValue: 1,
                column: "IdPublisher",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Books",
                keyColumn: "IdBook",
                keyValue: 2,
                column: "IdPublisher",
                value: 1);

            migrationBuilder.InsertData(
                table: "Publishers",
                columns: new[] { "IdPublisher", "IsActive", "Name" },
                values: new object[] { 1, true, "SuperNOWA" });

            migrationBuilder.CreateIndex(
                name: "IX_Books_IdPublisher",
                table: "Books",
                column: "IdPublisher");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Publishers_IdPublisher",
                table: "Books",
                column: "IdPublisher",
                principalTable: "Publishers",
                principalColumn: "IdPublisher");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Publishers_IdPublisher",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Publishers");

            migrationBuilder.DropIndex(
                name: "IX_Books_IdPublisher",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "IdPublisher",
                table: "Books");
        }
    }
}
