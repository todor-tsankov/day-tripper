using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Helpers;
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
        public IActionResult Get(int tripId)
        {
            var response = new Response()
            {
                Data = this.tripsService.GetSingle<TripDetailsViewModel>(x => x.Id == tripId),
            };

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(TripInputModel tripInput)
        {
            var response = new Response();
            var existsCity = this.citiesService.Exists(x => x.Id == tripInput.CityId);
            var existsCrag = this.cragsService.Exists(x => x.Id == tripInput.CragId);
            var existsSector = this.sectorsService.Exists(x => x.Id == tripInput.SectorId && x.CragId == tripInput.CragId);

            if (tripInput.SectorId == null)
            {
                existsSector = true;
            }

            if (!this.ModelState.IsValid || tripInput.Leaving > tripInput.Returning)
            {
                return this.BadRequest("Invalid input!");
            }

            if (!existsCity)
            {
                response.Message = "No such city!";
                return this.NotFound(response);
            }

            if (!existsCrag)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            if (!existsSector)
            {
                response.Message = "No such sector!";
                return this.NotFound(response);
            }

            tripInput.ApplicationUserId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await this.tripsService.AddAsync(tripInput);
            response.Message = "Successfully created trip";

            return this.Ok(response);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(TripEditModel tripEdit)
        {
            var response = new Response();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existsTrip = this.tripsService.Exists(x => x.Id == tripEdit.TripId && x.ApplicationUserId == userId);

            if (!existsTrip)
            {
                response.Message = "No such trip!";
                return this.NotFound(response);
            }

            var existsCity = this.citiesService.Exists(x => x.Id == tripEdit.CityId);
            var existsCrag = this.cragsService.Exists(x => x.Id == tripEdit.CragId);
            var existsSector = this.sectorsService.Exists(x => x.Id == tripEdit.SectorId && x.CragId == tripEdit.CragId);

            if (tripEdit.SectorId == null)
            {
                existsSector = true;
            }

            if (!this.ModelState.IsValid || tripEdit.Leaving > tripEdit.Returning)
            {
                response.Message = "Invalid input!";
                return this.BadRequest(response);
            }

            if (!existsCity)
            {
                response.Message = "No such city!";
                return this.NotFound(response);
            }

            if (!existsCrag)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            if (!existsSector)
            {
                response.Message = "No such sector!";
                return this.NotFound(response);
            }

            await this.tripsService.EditAsync(tripEdit);
            response.Message = "Successfully edited trip!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(TripDeleteModel tripInput)
        {
            var response = new Response();
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var exists = this.tripsService.Exists(x => x.Id == tripInput.TripId && x.ApplicationUserId == userId);

            if (!exists)
            {
                response.Message = "No such trip!";
                return this.NotFound(response);
            }

            await this.tripsService.DeleteAsync(x => x.Id == tripInput.TripId);
            response.Message = "Successfully deleted trip!";

            return this.Ok(response);
        }
    }
}
