using System;
using System.Collections.Generic;
using System.Linq.Expressions;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Trips;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TripsController : ControllerBase
    {
        private readonly ITripsService tripsService;

        public TripsController(ITripsService tripsService)
        {
            this.tripsService = tripsService;
        }

        [HttpGet]
        public IActionResult Get(TripSearchInputModel search)
        {
            var filters = this.GetFilters(search.CityId, search.CragId, search.Date, search.Seats);
            var orderBy = this.GetOrderBy(search.OrderBy);

            var result = this.tripsService.GetManyExtended<TripViewModel>(filters, orderBy, search.Ascending, search.Skip, search.Take);

            return this.Ok(result);
        }

        private Expression<Func<Trip, bool>>[] GetFilters(int? cityId, int? cragId, DateTime? date, int? seats)
        {
            var result = new List<Expression<Func<Trip, bool>>>();

            if (cityId != null)
            {
                result.Add(x => x.CityId == cityId);
            }

            if (cragId != null)
            {
                result.Add(x => x.CragId == cragId);
            }

            if (date != null)
            {
                result.Add(x => x.Leaving.Date == date);
            }

            if (seats != null)
            {
                result.Add(x => x.Seats >= seats);
            }

            return result.ToArray();
        }

        private Expression<Func<Trip, object>> GetOrderBy(string orderBy)
        {
            return orderBy switch
            {
                "lDate" => x => x.Leaving,
                "rDate" => x => x.Returning,
                "seats" => x => x.Seats,
                _ => x => x.Leaving,
            };
        }
    }
}
