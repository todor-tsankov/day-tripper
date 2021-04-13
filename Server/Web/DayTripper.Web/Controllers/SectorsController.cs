using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Helpers;
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

            var response = new Response()
            {
                Data = this.sectorsService.GetMany<SectorViewModel>(filter),
            };

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(SectorInputModel sectorInput)
        {
            var response = new Response();
            var existsByName = this.sectorsService.Exists(x => x.Name == sectorInput.Name);
            var existsCrag = this.cragsService.Exists(x => x.Id == sectorInput.CragId);

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "Sector with that name already exists!";
                return this.BadRequest(response);
            }

            if (!existsCrag)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            await this.cragsService.AddAsync(sectorInput);
            response.Message = "Successfully added sector!";

            return this.Ok(response);
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(SectorEditModel sectorEdit)
        {
            var response = new Response();
            var exists = this.sectorsService.Exists(x => x.Id == sectorEdit.SectorId);
            var existsCrag = this.cragsService.Exists(x => x.Id == sectorEdit.CragId);
            var existsByName = this.sectorsService.Exists(x => x.Id != sectorEdit.SectorId && x.Name == sectorEdit.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "Sector with that name already exists!";
                return this.BadRequest(response);
            }

            if (!existsCrag)
            {
                response.Message = "No such crag!";
                return this.NotFound(response);
            }

            if (!exists)
            {
                response.Message = "No such sector!";
                return this.NotFound(response);
            }

            await this.sectorsService.EditAsync(sectorEdit);
            response.Message = "Successfully edited sector!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int cityId)
        {
            var response = new Response();
            var exists = this.sectorsService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                response.Message = "No such sector!";
                return this.NotFound(response);
            }

            await this.sectorsService.DeleteAsync(x => x.Id == cityId);
            response.Message = "Successfully deleted sector!";

            return this.Ok(response);
        }
    }
}
