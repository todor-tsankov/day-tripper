using System;
using System.ComponentModel.DataAnnotations;

using DayTripper.Web.ViewModels.ValidationAttributes;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripEditModel
    {
        public int TripId { get; set; }

        public int CityId { get; set; }

        public int CragId { get; set; }

        public int? SectorId { get; set; }

        [Date]
        public DateTime Leaving { get; set; }

        [Date]
        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        [Range(1, 50)]
        public int? Seats { get; set; }

        [MaxLength(10000)]
        public string Comment { get; set; }
    }
}
