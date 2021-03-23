using System.Net;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc.Testing;

using Xunit;

namespace DayTripper.Web.Tests
{
    public class WebTests : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly WebApplicationFactory<Startup> server;

        public WebTests(WebApplicationFactory<Startup> server)
        {
            this.server = server;
        }
    }
}
