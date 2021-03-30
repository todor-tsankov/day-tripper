using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Follow : BaseDeletableModel<int>
    {
        public string FollowerId { get; set; }

        [ForeignKey("FollowerId")]
        public virtual ApplicationUser Follower { get; set; }

        public string FollowedId { get; set; }

        [ForeignKey("FollowedId")]
        public virtual ApplicationUser Followed { get; set; }
    }
}
