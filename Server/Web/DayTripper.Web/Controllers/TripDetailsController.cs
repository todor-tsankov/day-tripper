using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Trips;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripDetailsController : ControllerBase
    {
        private readonly ITripsService tripsService;
        private readonly ICitiesService citiesService;
        private readonly ICragsService cragsService;
        private readonly ISectorsService sectorsService;

        public TripDetailsController(
            ITripsService tripsService,
            ICitiesService citiesService,
            ICragsService cragsService,
            ISectorsService sectorsService)
        {
            this.tripsService = tripsService;
            this.citiesService = citiesService;
            this.cragsService = cragsService;
            this.sectorsService = sectorsService;
        }

        [HttpGet]
        public TripDetailsViewModel Get(int tripId)
        {
            return this.tripsService.GetSingle<TripDetailsViewModel>(x => x.Id == tripId);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(TripInputModel tripInput)
        {
            var existsCity = this.citiesService.Exists(x => x.Id == tripInput.CityId);
            var existsCrag = this.cragsService.Exists(x => x.Id == tripInput.CragId);
            var existsSector = this.sectorsService.Exists(x => x.Id == tripInput.SectorId && x.CragId == tripInput.CragId);

            if (tripInput.SectorId == null)
            {
                existsSector = true;
            }

            if (!this.ModelState.IsValid
                || !existsCity
                || !existsCrag
                || !existsSector
                || tripInput.Leaving < tripInput.Returning)
            {
                return this.Forbid("Invalid input!");
            }

            tripInput.ApplicationUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await this.tripsService.AddAsync(tripInput);

            return this.Ok("Successfully created trip");
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(TripEditModel tripEdit)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existsTrip = this.tripsService.Exists(x => x.Id == tripEdit.TripId && x.ApplicationUserId == userId);

            if (!existsTrip)
            {
                return this.NotFound("No such trip!");
            }

            var existsCity = this.citiesService.Exists(x => x.Id == tripEdit.CityId);
            var existsCrag = this.cragsService.Exists(x => x.Id == tripEdit.CragId);
            var existsSector = this.sectorsService.Exists(x => x.Id == tripEdit.SectorId && x.CragId == tripEdit.CragId);

            if (tripEdit.SectorId == null)
            {
                existsSector = true;
            }

            if (!this.ModelState.IsValid
                || !existsCity
                || !existsCrag
                || !existsSector
                || tripEdit.Leaving < tripEdit.Returning)
            {
                return this.Forbid("Invalid input!");
            }

            await this.tripsService.EditAsync(tripEdit);

            return this.Ok("Successfully edited trip!");
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(int tripId)
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var exists = this.tripsService.Exists(x => x.Id == tripId && x.ApplicationUserId == userId);

            if (!exists)
            {
                return this.NotFound("No such trip!");
            }

            await this.tripsService.DeleteAsync(x => x.Id == tripId);

            return this.Ok("Successfully deleted trip!");
        }
    }
}
