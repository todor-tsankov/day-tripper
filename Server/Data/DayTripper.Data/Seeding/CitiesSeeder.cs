using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

using DayTripper.Data.Models;

namespace DayTripper.Data.Seeding
{
    public class CitiesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            if (dbContext.Cities.Any())
            {
                return;
            }

            var citiesJson = await File.ReadAllTextAsync("./Seeding/Data/cities.json");
            var cities = JsonSerializer.Deserialize<List<City>>(citiesJson);

            await dbContext.Cities.AddRangeAsync(cities);
            await dbContext.SaveChangesAsync();
        }
    }
}
