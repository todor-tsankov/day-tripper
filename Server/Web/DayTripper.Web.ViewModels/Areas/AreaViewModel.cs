using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Areas
{
    public class AreaViewModel : IMapFrom<Area>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
