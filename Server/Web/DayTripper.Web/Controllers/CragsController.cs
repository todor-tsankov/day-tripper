using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Crags;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CragsController : ControllerBase
    {
        private readonly ICragsService cragsService;
        private readonly IAreasService areasService;

        public CragsController(ICragsService cragsService, IAreasService areasService)
        {
            this.cragsService = cragsService;
            this.areasService = areasService;
        }

        [HttpGet]
        public IActionResult Get(int? areaId)
        {
            Expression<Func<Crag, bool>> filter = areaId != null ? x => x.AreaId == areaId : null;

            return this.Ok(this.cragsService.GetMany<CragViewModel>(filter));
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(CragInputModel cragInput)
        {
            var existsByName = this.cragsService.Exists(x => x.Name == cragInput.Name);
            var existsArea = this.areasService.Exists(x => x.Id == cragInput.AreaId);

            if (!this.ModelState.IsValid || existsByName || !existsArea)
            {
                return this.Forbid("Invalid input!");
            }

            await this.cragsService.AddAsync(cragInput);
            return this.Ok("Successfully added crag!");
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(CragEditModel cragEdit)
        {
            var exists = this.cragsService.Exists(x => x.Id == cragEdit.CragId);
            var existsArea = this.areasService.Exists(x => x.Id == cragEdit.AreaId);
            var existsByName = this.cragsService.Exists(x => x.Id != cragEdit.CragId && x.Name == cragEdit.Name);

            if (!this.ModelState.IsValid || !existsArea || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            if (!exists)
            {
                return this.NotFound("No such crag!");
            }

            await this.cragsService.EditAsync(cragEdit);

            return this.Ok("Successfully edited crag!");
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int cityId)
        {
            var exists = this.cragsService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                return this.NotFound("No such crag!");
            }

            await this.cragsService.DeleteAsync(x => x.Id == cityId);

            return this.Ok("Successfully deleted crag!");
        }
    }
}
