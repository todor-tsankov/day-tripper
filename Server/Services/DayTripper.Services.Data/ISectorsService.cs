using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Sectors;

namespace DayTripper.Services.Data
{
    public interface ISectorsService : IBaseService<Sector>
    {
        Task EditAsync(SectorEditModel sectorEdit);
    }
}
