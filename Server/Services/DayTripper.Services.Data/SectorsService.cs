using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Sectors;

namespace DayTripper.Services.Data
{
    public class SectorsService : BaseService<Sector>, ISectorsService
    {
        private readonly IDeletableEntityRepository<Sector> sectorsRepository;
        private readonly IMapper mapper;

        public SectorsService(IDeletableEntityRepository<Sector> sectorsRepository, IMapper mapper)
            : base(sectorsRepository, mapper)
        {
            this.sectorsRepository = sectorsRepository;
            this.mapper = mapper;
        }

        public async Task EditAsync(SectorEditModel sectorEdit)
        {
            var original = this.sectorsRepository
                .All()
                .First(x => x.Id == sectorEdit.SectorId);

            original.Name = sectorEdit.Name;
            original.CragId = sectorEdit.CragId;

            await this.sectorsRepository.SaveChangesAsync();
        }
    }
}
