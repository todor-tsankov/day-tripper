using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

using AngleSharp;
using AngleSharp.Dom;
using DayTripper.Data.Scrapper.Dto;

namespace DayTripper.Data.Scrapper.Scrappers
{
    public sealed class ClimbingGuideScrapper : IDisposable
    {
        private const string Host = "https://www.climbingguidebg.com/";
        private const string Start = "https://www.climbingguidebg.com/cdb.php?lang=en";

        private readonly HttpClient client;
        private readonly IBrowsingContext context;

        public ClimbingGuideScrapper()
        {
            this.client = new HttpClient();
            this.context = BrowsingContext.New(Configuration.Default);
        }

        public async Task RunAsync()
        {
            Console.WriteLine($"Starting to scrape at {Start}");

            var source = await this.client.GetStringAsync(Start);
            var areas = await this.GetAreasInfo(source);

            var json = JsonSerializer.Serialize(areas);
            await File.WriteAllTextAsync("./areas.json", json);
        }

        public void Dispose()
        {
            this.client.Dispose();
            this.context.Dispose();
        }

        private async Task<List<Area>> GetAreasInfo(string source)
        {
            var areas = new List<Area>();

            var document = await this.context.OpenAsync(req => req.Content(source));
            var areaAnchors = document.QuerySelectorAll("tbody tr td:nth-child(2) a.name");

            foreach (var areaA in areaAnchors)
            {
                var area = new Area()
                {
                    Name = areaA.TextContent.ToLowerInvariant(),
                };

                Console.WriteLine($"Adding area: '{area.Name}'");
                areas.Add(area);

                var crags = await this.GetCragsInfo(areaA);
                crags.ForEach(x => area.Crags.Add(x));
            }

            return areas;
        }

        private async Task<List<Crag>> GetCragsInfo(IElement areaA)
        {
            var crags = new List<Crag>();

            var areaSource = await this.client.GetStringAsync(Host + areaA.GetAttribute("href"));
            var areaDocument = await this.context.OpenAsync(req => req.Content(areaSource));

            var cragAnchors = areaDocument.QuerySelectorAll("tbody tr td:nth-child(1) a.name");

            foreach (var cragA in cragAnchors)
            {
                var crag = new Crag()
                {
                    Name = cragA.TextContent.ToLowerInvariant(),
                };

                Console.WriteLine($"----Adding crag: '{crag.Name}'");
                crags.Add(crag);

                var sectors = await this.GetSectorsInfo(cragA);
                sectors.ForEach(x => crag.Sectors.Add(x));
            }

            return crags;
        }

        private async Task<List<Sector>> GetSectorsInfo(IElement cragA)
        {
            var sectors = new List<Sector>();

            var cragSource = await this.client.GetStringAsync(Host + cragA.GetAttribute("href"));
            var cragDocument = await this.context.OpenAsync(req => req.Content(cragSource));

            var sectorAnchors = cragDocument.QuerySelectorAll("tbody tr td:nth-child(1) a.name");

            foreach (var sectorA in sectorAnchors)
            {
                var sector = new Sector()
                {
                    Name = sectorA.TextContent.ToLowerInvariant(),
                };

                Console.WriteLine($"--------Adding sector: '{sector.Name}'");
                sectors.Add(sector);
            }

            return sectors;
        }
    }
}
