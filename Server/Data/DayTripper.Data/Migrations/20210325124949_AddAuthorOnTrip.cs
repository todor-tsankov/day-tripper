using Microsoft.EntityFrameworkCore.Migrations;

namespace DayTripper.Data.Migrations
{
    public partial class AddAuthorOnTrip : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId",
                table: "Trips",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Trips_ApplicationUserId",
                table: "Trips",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_AspNetUsers_ApplicationUserId",
                table: "Trips",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trips_AspNetUsers_ApplicationUserId",
                table: "Trips");

            migrationBuilder.DropIndex(
                name: "IX_Trips_ApplicationUserId",
                table: "Trips");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId",
                table: "Trips");
        }
    }
}
