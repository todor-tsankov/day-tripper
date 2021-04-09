using System;

using DayTripper.Data.Models;
using DayTripper.Services.Mapping;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripViewModel : IMapFrom<Trip>
    {
        public int Id { get; set; }

        public string ApplicationUserFirstName { get; set; }

        public string ApplicationUserLastName { get; set; }

        public string CityName { get; set; }

        public string CragAreaName { get; set; }

        public string CragName { get; set; }

        public string SectorName { get; set; }

        public DateTime Leaving { get; set; }

        public DateTime Returning { get; set; }

        public bool WithCar { get; set; }

        public int? Seats { get; set; }
    }
}
