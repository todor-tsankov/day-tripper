using DayTripper.Data.Models;
using DayTripper.Services.Mapping;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DayTripper.Web.ViewModels.UserTrips
{
    public class UserTripInputModel : IMapTo<UserTrip>
    {
        [BindNever]
        public string ApplicationUserId { get; set; }

        public int TripId { get; set; }
    }
}
