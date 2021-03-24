using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public IEnumerable<CityViewModel> Get()
        {
            return this.citiesService.GetMany<CityViewModel>();
        }
    }
}
