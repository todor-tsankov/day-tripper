using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Areas;

namespace DayTripper.Services.Data
{
    public interface IAreasService : IBaseService<Area>
    {
        Task EditAsync(AreaEditModel areaEdit);
    }
}
