using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class AreasService : BaseService<Area>, IAreasService
    {
        public AreasService(IDeletableEntityRepository<Area> areasRepository, IMapper mapper)
            : base(areasRepository, mapper)
        {
        }
    }
}
