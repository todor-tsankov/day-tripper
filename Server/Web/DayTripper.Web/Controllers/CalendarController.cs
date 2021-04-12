using System;

using DayTripper.Services.Data;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CalendarController : ControllerBase
    {
        private readonly ITripsService tripsService;

        public CalendarController(ITripsService tripsService)
        {
            this.tripsService = tripsService;
        }

        [HttpGet]
        public IActionResult Get(int year, int month)
        {
            var tripsPerDay = this.tripsService.GetMonthlyTripsPerDay(year, month);
            return this.Ok(tripsPerDay);
        }
    }
}
