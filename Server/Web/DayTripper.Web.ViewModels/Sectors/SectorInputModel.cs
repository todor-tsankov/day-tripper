using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Sectors
{
    public class SectorInputModel : IMapTo<Sector>
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }

        public int CragId { get; set; }
    }
}
