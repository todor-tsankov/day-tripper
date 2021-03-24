using Microsoft.AspNetCore.Mvc;

namespace DayTripper.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AreasController : ControllerBase
    {
        public AreasController()
        {
        }

        [HttpGet]
        public void Get()
        {
        }
    }
}
