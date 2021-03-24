using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SectorsController : ControllerBase
    {
        public SectorsController()
        {
        }

        [HttpGet]
        public void Get()
        {
        }
    }
}
