using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

using DayTripper.Data.Models;

namespace DayTripper.Data.Seeding
{
    public class AreasSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var areasJson = await File.ReadAllTextAsync("./Data/areas.json");
            var areas = JsonSerializer.Deserialize<Area>(areasJson);

            dbContext.Areas.AddRange(areas);
        }
    }
}
