using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Web.ViewModels.Helpers;
using DayTripper.Web.ViewModels.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<ApplicationRole> roleManager;
        private readonly IConfiguration configuration;

        public RegisterController(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegisterInputModel registerInput)
        {
            var response = new Response();
            var userExists = await this.userManager.FindByEmailAsync(registerInput.Email);

            if (userExists != null)
            {
                response.Message = "User with that email already exists!";
                return this.BadRequest(response);
            }

            var user = new ApplicationUser()
            {
                Email = registerInput.Email,
                UserName = registerInput.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                FirstName = registerInput.FirstName,
                LastName = registerInput.LastName,
                FacebookNotifications = registerInput.FacebookNotifications,
                SmsNotifications = registerInput.SmsNotifications,
                EmailNotifications = registerInput.EmailNotifications,
                PhoneNumber = registerInput.PhoneNumber,
            };

            var result = await this.userManager.CreateAsync(user, registerInput.Password);

            if (!result.Succeeded)
            {
                var errorMessage = string.Join(", ", result.Errors
                    .ToArray()
                    .Select(x => x.Description));

                response.Message = errorMessage;
                return this.BadRequest(response);
            }

            response.Message = "User created successfully!";
            return this.Ok(response);
        }
    }
}
