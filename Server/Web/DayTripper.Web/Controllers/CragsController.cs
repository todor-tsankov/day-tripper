using System;
using System.Collections.Generic;
using System.Linq.Expressions;

using DayTripper.Data.Models;
using DayTripper.Services.Data;
using DayTripper.Web.ViewModels.Crags;
using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CragsController : ControllerBase
    {
        private readonly ICragsService cragsService;

        public CragsController(ICragsService cragsService)
        {
            this.cragsService = cragsService;
        }

        [HttpGet]
        public IEnumerable<CragViewModel> Get(int? areaId)
        {
            Expression<Func<Crag, bool>> filter = areaId != null ? x => x.AreaId == areaId : null;

            return this.cragsService.GetMany<CragViewModel>(filter);
        }
    }
}
