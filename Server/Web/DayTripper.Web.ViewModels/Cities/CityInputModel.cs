using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Cities
{
    public class CityInputModel : IMapTo<City>
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
