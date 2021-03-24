using System.Threading.Tasks;

using DayTripper.Data.Scrapper.Scrappers;

namespace DayTripper.Data.Scrapper
{
    public class Program
    {
        public static async Task Main()
        {
            var climbingguideScrapper = new ClimbingGuideScrapper();

            await climbingguideScrapper.RunAsync();
        }
    }
}
