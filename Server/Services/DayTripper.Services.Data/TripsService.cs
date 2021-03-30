using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Trips;
using System.Linq;
using System.Threading.Tasks;

namespace DayTripper.Services.Data
{
    public class TripsService : BaseService<Trip>, ITripsService
    {
        private readonly IDeletableEntityRepository<Trip> tripsRepository;
        private readonly IMapper mapper;

        public TripsService(IDeletableEntityRepository<Trip> tripsRepository, IMapper mapper)
            : base(tripsRepository, mapper)
        {
            this.tripsRepository = tripsRepository;
            this.mapper = mapper;
        }

        public async Task EditAsync(TripEditModel tripEdit)
        {
            var original = this.tripsRepository
                .All()
                .First(x => x.Id == tripEdit.TripId);

            original.CityId = tripEdit.CityId;
            original.CragId = tripEdit.CragId;
            original.SectorId = tripEdit.SectorId;
            original.Leaving = tripEdit.Leaving;
            original.Returning = tripEdit.Returning;
            original.Comment = tripEdit.Comment;
            original.Seats = tripEdit.Seats;
            original.WithCar = tripEdit.WithCar;

            await this.tripsRepository.SaveChangesAsync();
        }
    }
}
