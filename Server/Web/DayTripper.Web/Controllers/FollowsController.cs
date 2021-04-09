using System.Security.Claims;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels;
using DayTripper.Web.ViewModels.Follows;
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
            var user = await this.userManager.FindByIdAsync(followInput.FollowedId);

            if (user == null)
            {
                return this.NotFound("No such user!");
            }

            followInput.FollowerId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await this.followsService.AddAsync(followInput);

            return this.Ok("Successfully added follow.");
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Delete(FollowDeleteModel followInput)
        {
            var user = await this.userManager.FindByIdAsync(followInput.UserId);

            if (user == null)
            {
                return this.NotFound("No such user!");
            }

            var currentId = this.User.FindFirstValue(ClaimTypes.NameIdentifier);
            await this.followsService.DeleteAsync(x => x.FollowedId == followInput.UserId && x.FollowerId == currentId);

            return this.Ok("Successfully deleted follow!");
        }
    }
}
