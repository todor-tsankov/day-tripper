using System.Collections.Generic;

using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Areas;
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
        public IEnumerable<AreaViewModel> Get()
        {
            return this.areasService.GetMany<AreaViewModel>();
        }
    }
}
