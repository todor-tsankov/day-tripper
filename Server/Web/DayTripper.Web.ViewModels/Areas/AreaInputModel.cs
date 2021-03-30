using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Areas
{
    public class AreaInputModel : IMapTo<Area>
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
