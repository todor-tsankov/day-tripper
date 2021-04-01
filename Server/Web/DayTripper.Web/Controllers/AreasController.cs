using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Areas;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AreasController : ControllerBase
    {
        private readonly IAreasService areasService;

        public AreasController(IAreasService areasService)
        {
            this.areasService = areasService;
        }

        [HttpGet]
        public IActionResult Get(int? areaId)
        {
            Expression<Func<Area, bool>> filter = areaId != null ? filter = x => x.Id == areaId : null;

            return this.Ok(this.areasService.GetMany<AreaViewModel>(filter));
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(AreaInputModel areaInput)
        {
            var existsByName = this.areasService.Exists(x => x.Name == areaInput.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            await this.areasService.AddAsync(areaInput);
            return this.Ok("Successfully added area!");
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(AreaEditModel areaEdit)
        {
            var exists = this.areasService.Exists(x => x.Id == areaEdit.AreaId);
            var existsByName = this.areasService.Exists(x => x.Id != areaEdit.AreaId && x.Name == areaEdit.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            if (!exists)
            {
                return this.NotFound("No such area!");
            }

            await this.areasService.EditAsync(areaEdit);

            return this.Ok("Successfully edited area!");
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int areaId)
        {
            var exists = this.areasService.Exists(x => x.Id == areaId);

            if (!exists)
            {
                return this.NotFound("No such area!");
            }

            await this.areasService.DeleteAsync(x => x.Id == areaId);

            return this.Ok("Successfully deleted area!");
        }
    }
}
