using System;
using System.ComponentModel.DataAnnotations;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;
using DayTripper.Web.ViewModels.ValidationAttributes;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripInputModel : IMapTo<Trip>
    {
        [BindNever]
        public string ApplicationUserId { get; set; }

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
