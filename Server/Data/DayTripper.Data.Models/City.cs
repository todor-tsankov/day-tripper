using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class City : BaseDeletableModel<int>
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
    }
}
