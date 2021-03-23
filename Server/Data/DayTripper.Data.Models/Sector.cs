using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Sector : BaseDeletableModel<int>
    {
        public string Name { get; set; }
    }
}
