using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Users
{
    public class LoginInputModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
