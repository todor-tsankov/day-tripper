using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels;
using DayTripper.Web.ViewModels.Follows;
using DayTripper.Web.ViewModels.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FollowsController : ControllerBase
    {
        private readonly IFollowsService followsService;
        private readonly UserManager<ApplicationUser> userManager;

        public FollowsController(IFollowsService followsService, UserManager<ApplicationUser> userManager)
        {
            this.followsService = followsService;
            this.userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get(string userId)
        {
            var currentId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isFollower = this.followsService.Exists(x => x.FollowedId == userId && x.FollowerId == currentId);

            return this.Ok(new FollowViewModel
            {
                IsFollower = isFollower,
            });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post(FollowInputModel followInput)
        {
            var response = new Response();
            var user = await this.userManager.FindByIdAsync(followInput.FollowedId);

            if (user == null)
            {
                response.Message = "No such user!";
                return this.NotFound(response);
            }

            followInput.FollowerId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.followsService.AddAsync(followInput);
            response.Message = "Successfully added follow.";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(FollowDeleteModel followInput)
        {
            var response = new Response();
            var user = await this.userManager.FindByIdAsync(followInput.UserId);

            if (user == null)
            {
                response.Message = "No such user!";
                return this.NotFound(response);
            }

            var currentId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.followsService.DeleteAsync(x => x.FollowedId == followInput.UserId && x.FollowerId == currentId);
            response.Message = "Successfully deleted follow!";

            return this.Ok(response);
        }
    }
}
