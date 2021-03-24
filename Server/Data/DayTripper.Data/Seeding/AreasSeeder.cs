using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using DayTripper.Data.Models;

namespace DayTripper.Data.Seeding
{
    public class AreasSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Areas.Any())
            {
                return;
            }

            var areasJson = await File.ReadAllTextAsync("./Seeding/Data/areas.json");
            var areas = JsonSerializer.Deserialize<List<Area>>(areasJson);

            await dbContext.Areas.AddRangeAsync(areas);
            await dbContext.SaveChangesAsync();
        }
    }
}
