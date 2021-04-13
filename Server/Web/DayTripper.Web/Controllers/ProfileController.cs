using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Helpers;
using DayTripper.Web.ViewModels.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        [Authorize]
        public IActionResult Get()
        {
            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            var response = new Response()
            {
                Data = this.usersService.GetSingle<UserViewModel>(x => x.Id == userId),
            };

            return this.Ok(response);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put(EditInputModel editInput)
        {
            var response = new Response();

            if (!this.ModelState.IsValid)
            {
                response.Message = "Invalid input!";
                return this.BadRequest(response);
            }

            editInput.Id = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.usersService.EditAsync(editInput);
            response.Message = "Successfully edited profile";

            return this.Ok(response);
        }
    }
}
