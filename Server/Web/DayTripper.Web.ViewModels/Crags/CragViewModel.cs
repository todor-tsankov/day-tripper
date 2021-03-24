using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Crags
{
    public class CragViewModel : IMapFrom<Crag>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}
