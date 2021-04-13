using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Areas;
using DayTripper.Web.ViewModels.Helpers;
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

            var response = new Response()
            {
                Data = this.areasService.GetMany<AreaViewModel>(filter),
            };

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(AreaInputModel areaInput)
        {
            var existsByName = this.areasService.Exists(x => x.Name == areaInput.Name);

            var response = new Response()
            {
                Message = "Successfully added area!",
            };

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "Area with that name already exists..";
                return this.BadRequest(response);
            }

            await this.areasService.AddAsync(areaInput);
            return this.Ok(response);
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(AreaEditModel areaEdit)
        {
            var response = new Response();
            var exists = this.areasService.Exists(x => x.Id == areaEdit.AreaId);
            var existsByName = this.areasService.Exists(x => x.Id != areaEdit.AreaId && x.Name == areaEdit.Name);

            if (!exists)
            {
                response.Message = "No such area!";
                return this.NotFound(response);
            }

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "Invalid input!";
                return this.BadRequest(response);
            }

            await this.areasService.EditAsync(areaEdit);
            response.Message = "Successfully edited area!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int areaId)
        {
            var response = new Response();
            var exists = this.areasService.Exists(x => x.Id == areaId);

            if (!exists)
            {
                response.Message = "No such area!";
                return this.NotFound(response);
            }

            await this.areasService.DeleteAsync(x => x.Id == areaId);
            response.Message = "Successfully deleted area!";

            return this.Ok(response);
        }
    }
}
