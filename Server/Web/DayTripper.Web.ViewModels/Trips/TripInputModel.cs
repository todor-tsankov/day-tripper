using System;
using System.ComponentModel.DataAnnotations;
using DayTripper.Web.ViewModels.ValidationAttributes;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripInputModel
    {
        [BindNever]
        public string ApplicationUserId { get; set; }

        public int CityId { get; set; }

        public int AreaId { get; set; }

        public int? SectorId { get; set; }

        [Date]
        public DateTime Leaving { get; set; }

        [Date]
        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        [Range(2, 50)]
        public int? Seats { get; set; }
    }
}
