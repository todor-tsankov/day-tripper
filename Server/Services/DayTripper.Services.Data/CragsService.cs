using System.Linq;
using System.Threading.Tasks;

using AutoMapper;
using DayTripper.Data.Common.Repositories;
using DayTripper.Data.Models;
using DayTripper.Services.Data.Common;
using DayTripper.Web.ViewModels.Crags;

namespace DayTripper.Services.Data
{
    public class CragsService : BaseService<Crag>, ICragsService
    {
        private readonly IDeletableEntityRepository<Crag> cragsRepository;
        private readonly IMapper mapper;

        public CragsService(IDeletableEntityRepository<Crag> cragsRepository, IMapper mapper)
            : base(cragsRepository, mapper)
        {
            this.cragsRepository = cragsRepository;
            this.mapper = mapper;
        }

        public async Task EditAsync(CragEditModel cragEdit)
        {
            var original = this.cragsRepository
                .All()
                .Where(x => x.Id == cragEdit.CragId)
                .First();

            original.Name = cragEdit.Name;
            original.AreaId = cragEdit.AreaId;

            await this.cragsRepository.SaveChangesAsync();
        }
    }
}
