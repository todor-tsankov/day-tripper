using System;
using System.Linq;

using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using Xunit;

namespace DayTripper.Web.Tests
{
    public class SeleniumTests : IClassFixture<SeleniumServerFactory<Startup>>, IDisposable
    {
        private readonly SeleniumServerFactory<Startup> server;
        private readonly IWebDriver browser;

        public SeleniumTests(SeleniumServerFactory<Startup> server)
        {
            this.server = server;
            server.CreateClient();
            var opts = new ChromeOptions();
            opts.AddArguments("--headless");
            opts.AcceptInsecureCertificates = true;
            this.browser = new ChromeDriver(opts);
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.server?.Dispose();
                this.browser?.Dispose();
            }
        }
    }
}
