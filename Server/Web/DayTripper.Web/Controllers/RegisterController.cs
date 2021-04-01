using System;
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
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;

        public RegisterController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegisterInputModel registerInput)
        {
            var userExists = await this.userManager.FindByEmailAsync(registerInput.Email);
            if (userExists != null)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });
            }

            return this.Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
    }
}
