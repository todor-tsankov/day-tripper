using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.UserTrips
{
    public class UserTripViewModel : IMapFrom<UserTrip>
    {
        public int Id { get; set; }
        
        public string ApplicationUserId { get; set; }

        public string ApplicationUserFirstName { get; set; }

        public string ApplicationUserLastName { get; set; }
    }
}
