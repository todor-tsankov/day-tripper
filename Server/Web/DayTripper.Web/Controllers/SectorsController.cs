using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Sectors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SectorsController : ControllerBase
    {
        private readonly ISectorsService sectorsService;
        private readonly ICragsService cragsService;

        public SectorsController(ISectorsService sectorsService, ICragsService cragsService)
        {
            this.sectorsService = sectorsService;
            this.cragsService = cragsService;
        }

        [HttpGet]
        public IActionResult Get(int? cragId)
        {
            Expression<Func<Sector, bool>> filter = cragId != null ? x => x.CragId == cragId : null;

            return this.Ok(this.sectorsService.GetMany<SectorViewModel>(filter));
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(SectorInputModel sectorInput)
        {
            var existsByName = this.sectorsService.Exists(x => x.Name == sectorInput.Name);
            var existsCrag = this.cragsService.Exists(x => x.Id == sectorInput.CragId);

            if (!this.ModelState.IsValid || existsByName || !existsCrag)
            {
                return this.Forbid("Invalid input!");
            }

            await this.cragsService.AddAsync(sectorInput);
            return this.Ok("Successfully added sector!");
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(SectorEditModel sectorEdit)
        {
            var exists = this.sectorsService.Exists(x => x.Id == sectorEdit.SectorId);
            var existsCrag = this.cragsService.Exists(x => x.Id == sectorEdit.CragId);
            var existsByName = this.sectorsService.Exists(x => x.Id != sectorEdit.SectorId && x.Name == sectorEdit.Name);

            if (!this.ModelState.IsValid || !existsCrag || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            if (!exists)
            {
                return this.NotFound("No such sector!");
            }

            await this.sectorsService.EditAsync(sectorEdit);

            return this.Ok("Successfully edited sector!");
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int cityId)
        {
            var exists = this.sectorsService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                return this.NotFound("No such sector!");
            }

            await this.sectorsService.DeleteAsync(x => x.Id == cityId);

            return this.Ok("Successfully deleted sector!");
        }
    }
}
