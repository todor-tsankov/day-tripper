using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Sector : BaseDeletableModel<int>
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
