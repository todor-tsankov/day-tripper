using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Cities;
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

            return this.Ok(this.citiesService.GetMany<CityViewModel>(filter));
        }

        [HttpPost]
        public async Task<IActionResult> Post(CityInputModel cityInput)
        {
            var existsByName = this.citiesService.Exists(x => x.Name == cityInput.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            await this.citiesService.AddAsync(cityInput);
            return this.Ok("Successfully added city!");
        }

        [HttpPut]
        public async Task<IActionResult> Put(CityEditModel cityEdit)
        {
            var exists = this.citiesService.Exists(x => x.Id == cityEdit.CityId);
            var existsByName = this.citiesService.Exists(x => x.Id != cityEdit.CityId && x.Name == cityEdit.Name);

            if (!this.ModelState.IsValid || existsByName)
            {
                return this.Forbid("Invalid input!");
            }

            if (!exists)
            {
                return this.NotFound("No such city!");
            }

            await this.citiesService.EditAsync(cityEdit);

            return this.Ok("Successfully edited city!");
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int cityId)
        {
            var exists = this.citiesService.Exists(x => x.Id == cityId);

            if (!exists)
            {
                return this.NotFound("No such city!");
            }

            await this.citiesService.DeleteAsync(x => x.Id == cityId);

            return this.Ok("Successfully deleted city!");
        }
    }
}
