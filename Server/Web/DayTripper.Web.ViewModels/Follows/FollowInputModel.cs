using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DayTripper.Web.ViewModels.Follows
{
    public class FollowInputModel : IMapTo<Follow>
    {
        [BindNever]
        public string FollowerId { get; set; }

        [Required]
        public string FollowedId { get; set; }
    }
}
