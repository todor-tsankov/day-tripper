using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Trips;

namespace DayTripper.Services.Data
{
    public interface ITripsService : IBaseService<Trip>
    {
        Task EditAsync(TripEditModel tripEdit);
    }
}
