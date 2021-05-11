using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Helpers;
using DayTripper.Web.ViewModels.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PasswordController : ControllerBase
    {
        private readonly IApplicationUsersService usersService;

        public PasswordController(IApplicationUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(ChangePasswordInputModel changePasswordInput)
        {
            var response = new Response();

            if (!this.ModelState.IsValid)
            {
                response.Message = "Invalid data";
                return this.BadRequest(response);
            }

            if (changePasswordInput.Password != changePasswordInput.ConfirmPassword)
            {
                response.Message = "The new passwords don't match!";
                return this.BadRequest(response);
            }

            var userId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await this.usersService.ChangePasswordAsync(userId, changePasswordInput.OldPassword, changePasswordInput.Password);

            if (success)
            {
                response.Message = "Successfully updated password!";
            }
            else
            {
                response.Message = "The old password is incorrect!";
            }

            return this.Ok(response);
        }
    }
}
