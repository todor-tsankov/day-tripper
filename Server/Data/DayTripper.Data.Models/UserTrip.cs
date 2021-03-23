namespace DayTripper.Data.Models
{
    public class UserTrip
    {
        public string ApplicationUserId { get; set; }

        public ApplicationUser ApplicationUser { get; set; }

        public int TripId { get; set; }

        public Trip Trip { get; set; }
    }
}
