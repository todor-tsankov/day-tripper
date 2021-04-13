using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Common;
using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Cities;
using DayTripper.Web.ViewModels.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ICitiesService citiesService;

        public CitiesController(ICitiesService citiesService)
        {
            this.citiesService = citiesService;
        }

        [HttpGet]
        public IActionResult Get(int? cityId)
        {
            Expression<Func<City, bool>> filter = cityId != null ? filter = x => x.Id == cityId : null;

            var response = new Response()
            {
                Data = this.citiesService.GetMany<CityViewModel>(filter),
            };

            return this.Ok(response);
        }

        [HttpPost]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Post(CityInputModel cityInput)
        {
            var response = new Response();
            var existsByName = this.citiesService.Exists(x => x.Name == cityInput.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "City with that name already exists!";
                return this.BadRequest(response);
            }

            await this.citiesService.AddAsync(cityInput);
            response.Message = "Successfully added city!";

            return this.Ok(response);
        }

        [HttpPut]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Put(CityEditModel cityEdit)
        {
            var response = new Response();
            var exists = this.citiesService.Exists(x => x.Id == cityEdit.CityId);
            var existsByName = this.citiesService.Exists(x => x.Id != cityEdit.CityId && x.Name == cityEdit.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                response.Message = "City with that name already exists!";
                return this.BadRequest(response);
            }

            if (!exists)
            {
                response.Message = "No such city!";
                return this.NotFound(response);
            }

            await this.citiesService.EditAsync(cityEdit);
            response.Message = "Successfully edited city!";

            return this.Ok(response);
        }

        [HttpDelete]
        [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<IActionResult> Delete(int cityId)
        {
            var response = new Response();
            var exists = this.citiesService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                response.Message = "No such city!";
                return this.NotFound(response);
            }

            await this.citiesService.DeleteAsync(x => x.Id == cityId);
            response.Message = "Successfully deleted city!";

            return this.Ok(response);
        }
    }
}
