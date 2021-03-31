using DayTripper.Services.Data;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LogoutController : ControllerBase
    {
        private readonly IApplicationUsersService usersService;

        public LogoutController(IApplicationUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return this.Ok();
        }
    }
}
