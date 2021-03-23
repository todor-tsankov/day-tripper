using System.ComponentModel.DataAnnotations;

namespace DayTripper.Data.Models
{
    public class UserTrip
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
