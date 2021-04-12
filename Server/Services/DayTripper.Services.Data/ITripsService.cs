using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Trips;

namespace DayTripper.Services.Data
{
    public interface ITripsService : IBaseService<Trip>
    {
        IDictionary<int, int> GetMonthlyTripsPerDay(int year, int month);

        Task EditAsync(TripEditModel tripEdit);
    }
}
