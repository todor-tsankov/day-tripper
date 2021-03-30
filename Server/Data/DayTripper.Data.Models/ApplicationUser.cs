using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;
using Microsoft.AspNetCore.Identity;

namespace DayTripper.Data.Models
{
    public class ApplicationUser : IdentityUser, IAuditInfo, IDeletableEntity
    {
        public ApplicationUser()
        {
            this.Id = Guid.NewGuid().ToString();

            this.Followers = new HashSet<Follow>();
            this.Followed = new HashSet<Follow>();
            this.UserTrips = new HashSet<UserTrip>();

            this.Roles = new HashSet<IdentityUserRole<string>>();
            this.Claims = new HashSet<IdentityUserClaim<string>>();
            this.Logins = new HashSet<IdentityUserLogin<string>>();
        }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public bool SmsNotifications { get; set; }

        public bool EmailNotifications { get; set; }

        public bool FacebookNotifications { get; set; }

        // Audit info
        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        // Deletable entity
        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public virtual ICollection<Follow> Followers { get; set; }

        public virtual ICollection<Follow> Followed { get; set; }

        public virtual ICollection<UserTrip> UserTrips { get; set; }

        public virtual ICollection<IdentityUserRole<string>> Roles { get; set; }

        public virtual ICollection<IdentityUserClaim<string>> Claims { get; set; }

        public virtual ICollection<IdentityUserLogin<string>> Logins { get; set; }
    }
}
