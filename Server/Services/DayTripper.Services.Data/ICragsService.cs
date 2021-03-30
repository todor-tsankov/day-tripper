using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Crags;

namespace DayTripper.Services.Data
{
    public interface ICragsService : IBaseService<Crag>
    {
        Task EditAsync(CragEditModel cragEdit);
    }
}
