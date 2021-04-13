using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Crags;
using DayTripper.Web.ViewModels.Helpers;
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

            var response = new Response()
            {
                Data = this.cragsService.GetMany<CragViewModel>(filter),
            };

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(CragInputModel cragInput)
        {
            var response = new Response();
            var existsByName = this.cragsService.Exists(x => x.Name == cragInput.Name);
            var existsArea = this.areasService.Exists(x => x.Id == cragInput.AreaId);

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "Crag with that name already exists!";
                return this.BadRequest(response);
            }

            if (!existsArea)
            {
                response.Message = "No such area!";
                return this.NotFound(response);
            }

            await this.cragsService.AddAsync(cragInput);
            response.Message = "Successfully added crag!";

            return this.Ok(response);
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(CragEditModel cragEdit)
        {
            var response = new Response();
            var exists = this.cragsService.Exists(x => x.Id == cragEdit.CragId);
            var existsArea = this.areasService.Exists(x => x.Id == cragEdit.AreaId);
            var existsByName = this.cragsService.Exists(x => x.Id != cragEdit.CragId && x.Name == cragEdit.Name);

            if (!this.ModelState.IsValid || !existsArea || existsByName)
            {
                response.Message = "Crag with that name already exists!";
                return this.BadRequest(response);
            }

            if (!exists)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            await this.cragsService.EditAsync(cragEdit);
            response.Message = "Successfully edited crag!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int cityId)
        {
            var response = new Response();
            var exists = this.cragsService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            await this.cragsService.DeleteAsync(x => x.Id == cityId);
            response.Message = "Successfully deleted crag!";

            return this.Ok(response);
        }
    }
}
