using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.UserTrips;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserTripsController : ControllerBase
    {
        private readonly IUserTripsService userTripsService;
        private readonly ITripsService tripsService;

        public UserTripsController(IUserTripsService userTripsService, ITripsService tripsService)
        {
            this.userTripsService = userTripsService;
            this.tripsService = tripsService;
        }

        [HttpGet]
        public IActionResult Get(int tripId)
        {
            var existsUserTrip = this.userTripsService.Exists(x => x.Id == tripId);

            if (!existsUserTrip)
            {
                return this.NotFound("No such user trip!");
            }

            return this.Ok(this.userTripsService.GetMany<UserTripViewModel>(x => x.TripId == tripId));
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserTripInputModel userTripInput)
        {
            var existsTrip = this.tripsService.Exists(x => x.Id == userTripInput.TripId);

            if (!existsTrip)
            {
                return this.NotFound("No such trip!");
            }

            userTripInput.ApplicationUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await this.userTripsService.AddAsync(userTripInput);

            return this.Ok("Successfully joined the trip!");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int userTripId)
        {
            var existsUserTrip = this.userTripsService.Exists(x => x.Id == userTripId);

            if (!existsUserTrip)
            {
                return this.NotFound("No such user trip!");
            }

            await this.userTripsService.DeleteAsync(x => x.Id == userTripId);

            return this.Ok("Successfully deleted user trip!");
        }
    }
}
