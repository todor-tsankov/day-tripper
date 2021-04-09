using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class FollowsService : BaseService<Follow>, IFollowsService
    {
        public FollowsService(IDeletableEntityRepository<Follow> followsRepository, IMapper mapper)
            : base(followsRepository, mapper)
        {
        }
    }
}
