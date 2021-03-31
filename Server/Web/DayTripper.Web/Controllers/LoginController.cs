using DayTripper.Services.Data;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IApplicationUsersService usersService;

        public LoginController(IApplicationUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost]
        public IActionResult Post()
        {
            return this.Ok();
        }
    }
}
