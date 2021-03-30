using System;
using System.ComponentModel.DataAnnotations;

namespace DayTripper.Web.ViewModels.Trips
{
    public class TripSearchInputModel
    {
        public int? CityId { get; set; }

        public int? CragId { get; set; }

        public DateTime? Date { get; set; }

        public int? Seats { get; set; }

        public string OrderBy { get; set; }

        public bool Ascending { get; set; }

        public int? Skip { get; set; }

        public int? Take { get; set; }
    }
}
