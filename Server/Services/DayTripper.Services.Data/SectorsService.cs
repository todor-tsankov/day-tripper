using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class SectorsService : BaseService<Sector>, ISectorsService
    {
        public SectorsService(IDeletableEntityRepository<Sector> sectorsRepository, IMapper mapper)
            : base(sectorsRepository, mapper)
        {
        }
    }
}
