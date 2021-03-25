using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Trips;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly ITripsService tripsService;

        public TripsController(ITripsService tripsService)
        {
            this.tripsService = tripsService;
        }

        [HttpGet]
        public TripViewModel Get(int id)
        {
            // Chck if id exists
            return this.tripsService.GetSingle<TripViewModel>(x => x.Id == id);
        }

        [HttpPost]
        public async Task<IActionResult> Post(TripInputModel tripInput)
        {
            if (!this.ModelState.IsValid || tripInput.Leaving < tripInput.Returning)
            {
                return this.BadRequest();
            }

            // CHECK if all input Ids exists
            // TODO add creator id to input
            await this.tripsService.AddAsync(tripInput);

            return this.Ok();
        }

        [HttpPut]
        public void Put()
        {
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            await this.tripsService.DeleteAsync(x => x.Id == id);

            // TODO check if current user is creator
            // TODO check if exists such id

            return this.Ok();
        }
    }
}
