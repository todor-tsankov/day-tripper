using System;
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
                var sb = new StringBuilder();
                var enumerator = result.Errors.GetEnumerator();

                var hasNext = true;

                while (hasNext)
                {
                    if (enumerator.Current != null)
                    {
                        sb.AppendLine(enumerator.Current.Description);
                    }

                    hasNext = enumerator.MoveNext();
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = sb.ToString() });
            }

            return this.Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }
    }
}
