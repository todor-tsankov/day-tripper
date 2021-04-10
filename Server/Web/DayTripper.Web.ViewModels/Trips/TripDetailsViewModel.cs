using System;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripDetailsViewModel : IMapFrom<Trip>
    {
        public string ApplicationUserId { get; set; }

        public string ApplicationUserFirstName { get; set; }

        public string ApplicationUserLastName { get; set; }

        public int CityId { get; set; }

        public string CityName { get; set; }

        public int CragAreaId { get; set; }

        public string CragAreaName { get; set; }

        public int CragId { get; set; }

        public string CragName { get; set; }

        public int? SectorId { get; set; }

        public string SectorName { get; set; }

        public DateTime Leaving { get; set; }

        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        public int? Seats { get; set; }
    }
}
