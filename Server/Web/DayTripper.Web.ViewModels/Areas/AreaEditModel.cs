using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Areas
{
    public class AreaEditModel
    {
        [Required]
        public int AreaId { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
