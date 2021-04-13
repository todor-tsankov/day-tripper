using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Helpers;
using DayTripper.Web.ViewModels.UserTrips;
using Microsoft.AspNetCore.Authorization;
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
            var response = new Response();
            var existsTrip = this.tripsService.Exists(x => x.Id == tripId);

            if (!existsTrip)
            {
                response.Message = "No such trip!";
                return this.NotFound(response);
            }

            response.Data = this.userTripsService.GetMany<UserTripViewModel>(x => x.TripId == tripId);
            return this.Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(UserTripInputModel userTripInput)
        {
            var response = new Response();
            var existsTrip = this.tripsService.Exists(x => x.Id == userTripInput.TripId);

            if (!existsTrip)
            {
                response.Message = "No such trip!";
                return this.NotFound(response);
            }

            userTripInput.ApplicationUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.userTripsService.AddAsync(userTripInput);
            response.Message = "Successfully joined the trip!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(UserTripDeleteModel userTripInput)
        {
            var response = new Response();
            var currentId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existsUserTrip = this.userTripsService.Exists(x => x.TripId == userTripInput.TripId && x.ApplicationUserId == currentId);

            if (!existsUserTrip)
            {
                response.Message = "No such user in the trip!";
                return this.NotFound(response);
            }

            await this.userTripsService.DeleteAsync(x => x.TripId == userTripInput.TripId && x.ApplicationUserId == currentId);
            response.Message = "Successfully left the trip!";

            return this.Ok(response);
        }
    }
}
