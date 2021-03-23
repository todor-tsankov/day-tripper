using System;
using System.Collections.Generic;
using DayTripper.Data.Common.Models;

namespace DayTripper.Data.Models
{
    public class Trip : BaseDeletableModel<int>
    {
        public Trip()
        {
            this.UserTrips = new HashSet<UserTrip>();
        }

        public int CityId { get; set; }

        public City City { get; set; }

        public int SectorId { get; set; }

        public Sector Sector { get; set; }

        public DateTime Leaving { get; set; }

        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        public int? Seats { get; set; }

        public ICollection<UserTrip> UserTrips { get; set; }
    }
}
