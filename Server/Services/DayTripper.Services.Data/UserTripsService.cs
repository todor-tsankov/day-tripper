using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class UserTripsService : BaseService<UserTrip>, IUserTripsService
    {
        public UserTripsService(IDeletableEntityRepository<UserTrip> userTripsRepository, IMapper mapper)
            : base(userTripsRepository, mapper)
        {
        }
    }
}
