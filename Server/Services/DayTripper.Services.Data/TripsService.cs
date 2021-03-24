using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class TripsService : BaseService<Trip>, ITripsService
    {
        public TripsService(IDeletableEntityRepository<Trip> tripsRepository, IMapper mapper)
            : base(tripsRepository, mapper)
        {
        }
    }
}
