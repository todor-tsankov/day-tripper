using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;

namespace DayTripper.Services.Data
{
    public class CitiesService : BaseService<City>, ICitiesService
    {
        public CitiesService(IDeletableEntityRepository<City> citiesRepository, IMapper mapper)
            : base(citiesRepository, mapper)
        {
        }
    }
}
