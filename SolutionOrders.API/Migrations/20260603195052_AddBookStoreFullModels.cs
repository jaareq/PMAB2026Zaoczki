using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SolutionOrders.API.Migrations
{
    /// <inheritdoc />
    public partial class AddBookStoreFullModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppUsers",
                columns: table => new
                {
                    IdAppUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUsers", x => x.IdAppUser);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    IdReview = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.IdReview);
                    table.ForeignKey(
                        name: "FK_Reviews_Books_IdBook",
                        column: x => x.IdBook,
                        principalTable: "Books",
                        principalColumn: "IdBook",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookOrders",
                columns: table => new
                {
                    IdBookOrder = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdAppUser = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookOrders", x => x.IdBookOrder);
                    table.ForeignKey(
                        name: "FK_BookOrders_AppUsers_IdAppUser",
                        column: x => x.IdAppUser,
                        principalTable: "AppUsers",
                        principalColumn: "IdAppUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookOrderItems",
                columns: table => new
                {
                    IdBookOrderItem = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdBookOrder = table.Column<int>(type: "int", nullable: false),
                    IdBook = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookOrderItems", x => x.IdBookOrderItem);
                    table.ForeignKey(
                        name: "FK_BookOrderItems_BookOrders_IdBookOrder",
                        column: x => x.IdBookOrder,
                        principalTable: "BookOrders",
                        principalColumn: "IdBookOrder",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookOrderItems_Books_IdBook",
                        column: x => x.IdBook,
                        principalTable: "Books",
                        principalColumn: "IdBook",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Reviews",
                columns: new[] { "IdReview", "Content", "IdBook", "IsActive", "Rating" },
                values: new object[,]
                {
                    { 1, "Bardzo dobra książka, świetny klimat.", 1, true, 5 },
                    { 2, "Ciekawa historia i dobrze napisane postacie.", 2, true, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookOrderItems_IdBook",
                table: "BookOrderItems",
                column: "IdBook");

            migrationBuilder.CreateIndex(
                name: "IX_BookOrderItems_IdBookOrder",
                table: "BookOrderItems",
                column: "IdBookOrder");

            migrationBuilder.CreateIndex(
                name: "IX_BookOrders_IdAppUser",
                table: "BookOrders",
                column: "IdAppUser");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_IdBook",
                table: "Reviews",
                column: "IdBook");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookOrderItems");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "BookOrders");

            migrationBuilder.DropTable(
                name: "AppUsers");
        }
    }
}
