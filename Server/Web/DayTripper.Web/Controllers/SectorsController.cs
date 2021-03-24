using System;
using System.Collections.Generic;
using System.Linq.Expressions;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Sectors;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SectorsController : ControllerBase
    {
        private readonly ISectorsService sectorsService;

        public SectorsController(ISectorsService sectorsService)
        {
            this.sectorsService = sectorsService;
        }

        [HttpGet]
        public IEnumerable<SectorViewModel> Get(int? cragId)
        {
            Expression<Func<Sector, bool>> filter = cragId != null ? x => x.CragId == cragId : null;

            return this.sectorsService.GetMany<SectorViewModel>(filter);
        }
    }
}
