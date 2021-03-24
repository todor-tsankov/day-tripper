using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class UserTrip : BaseDeletableModel<int>
    {
        [Required]
        public string ApplicationUserId { get; set; }

        [Required]
        public ApplicationUser ApplicationUser { get; set; }

        public int TripId { get; set; }

        [Required]
        public Trip Trip { get; set; }
    }
}
