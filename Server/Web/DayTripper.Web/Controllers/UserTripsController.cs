using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserTripsController : ControllerBase
    {
        public UserTripsController()
        {
        }

        [HttpGet]
        public void Get()
        {
        }

        [HttpPost]
        public async Task<IActionResult> Post()
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            return this.Ok();
        }

        [HttpPut]
        public void Put()
        {
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            return this.Ok();
        }
    }
}
