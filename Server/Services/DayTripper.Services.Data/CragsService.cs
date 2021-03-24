using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class CragsService : BaseService<Crag>, ICragsService
    {
        public CragsService(IDeletableEntityRepository<Crag> cragsRepository, IMapper mapper)
            : base(cragsRepository, mapper)
        {
        }
    }
}
