using DayTripper.Services.Data;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly IApplicationUsersService usersService;

        public ProfileController(IApplicationUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet]
        public IActionResult Get(int userId)
        {
            return this.Ok();
        }

        [HttpPut]
        public IActionResult Put()
        {
            return this.Ok();
        }
    }
}
