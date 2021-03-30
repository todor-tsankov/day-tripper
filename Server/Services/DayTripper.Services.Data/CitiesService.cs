using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Cities;

namespace DayTripper.Services.Data
{
    public class CitiesService : BaseService<City>, ICitiesService
    {
        private readonly IDeletableEntityRepository<City> citiesRepository;
        private readonly IMapper mapper;

        public CitiesService(IDeletableEntityRepository<City> citiesRepository, IMapper mapper)
            : base(citiesRepository, mapper)
        {
            this.citiesRepository = citiesRepository;
            this.mapper = mapper;
        }

        public async Task EditAsync(CityEditModel cityEdit)
        {
            var original = this.citiesRepository
                .All()
                .Where(x => x.Id == cityEdit.CityId)
                .First();

            original.Name = cityEdit.Name;
            await this.citiesRepository.SaveChangesAsync();
        }
    }
}
