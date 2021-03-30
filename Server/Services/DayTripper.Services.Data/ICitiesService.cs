using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Cities;

namespace DayTripper.Services.Data
{
    public interface ICitiesService : IBaseService<City>
    {
        Task EditAsync(CityEditModel cityEdit);
    }
}
