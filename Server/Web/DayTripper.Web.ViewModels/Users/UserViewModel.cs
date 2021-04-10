using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Users
{
    public class UserViewModel : IMapFrom<ApplicationUser>
    {
        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhoneNumber { get; set; }

        public bool SmsNotifications { get; set; }

        public bool EmailNotifications { get; set; }

        public bool FacebookNotifications { get; set; }
    }
}
