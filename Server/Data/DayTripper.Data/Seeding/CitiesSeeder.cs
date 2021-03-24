﻿using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

using DayTripper.Data.Models;

namespace DayTripper.Data.Seeding
{
    public class CitiesSeeder : ISeeder
    {
        public async Task SeedAsync(ApplicationDbContext dbContext, IServiceProvider serviceProvider)
        {
            var citiesJson = await File.ReadAllTextAsync("./Data/cities.json");
            var cities = JsonSerializer.Deserialize<City>(citiesJson);

            dbContext.Cities.AddRange(cities);
        }
    }
}
