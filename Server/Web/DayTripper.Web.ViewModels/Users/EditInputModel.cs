using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DayTripper.Web.ViewModels.Users
{
    public class EditInputModel
    {
        [BindNever]
        public string Id { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(1)]
        [MaxLength(50)]
        public string LastName { get; set; }

        public bool SmsNotifications { get; set; }

        public bool EmailNotifications { get; set; }

        public bool FacebookNotifications { get; set; }
    }
}
