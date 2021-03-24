using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Sectors
{
    public class SectorViewModel : IMapFrom<Sector>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
