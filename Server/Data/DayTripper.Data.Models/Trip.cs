using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Trip : BaseDeletableModel<int>
    {
        public Trip()
        {
            this.UserTrips = new HashSet<UserTrip>();
        }

        [Required]
        public string ApplicationUserId { get; set; }

        [Required]
        public ApplicationUser ApplicationUser { get; set; }

        public int CityId { get; set; }

        [Required]
        public City City { get; set; }

        public int AreaId { get; set; }

        [Required]
        public Area Area { get; set; }

        public int? SectorId { get; set; }

        public Sector Sector { get; set; }

        public DateTime Leaving { get; set; }

        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        public int? Seats { get; set; }

        [MaxLength(10000)]
        public string Comment { get; set; }

        public ICollection<UserTrip> UserTrips { get; set; }
    }
}
