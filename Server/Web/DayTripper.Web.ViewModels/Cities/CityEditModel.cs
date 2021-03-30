using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Cities
{
    public class CityEditModel
    {
        [Required]
        public int CityId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
