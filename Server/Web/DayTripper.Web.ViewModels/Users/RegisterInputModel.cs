using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Users
{
    public class RegisterInputModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

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

        public string PhoneNumber { get; set; }
    }
}
