using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Areas;

namespace DayTripper.Services.Data
{
    public class AreasService : BaseService<Area>, IAreasService
    {
        private readonly IDeletableEntityRepository<Area> areasRepository;
        private readonly IMapper mapper;

        public AreasService(IDeletableEntityRepository<Area> areasRepository, IMapper mapper)
            : base(areasRepository, mapper)
        {
            this.areasRepository = areasRepository;
            this.mapper = mapper;
        }

        public async Task EditAsync(AreaEditModel areaEdit)
        {
            var original = this.areasRepository
                .All()
                .First(x => x.Id == areaEdit.AreaId);

            original.Name = areaEdit.Name;
            await this.areasRepository.SaveChangesAsync();
        }
    }
}
