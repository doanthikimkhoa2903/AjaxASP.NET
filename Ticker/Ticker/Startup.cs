using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Ticker.Startup))]
namespace Ticker
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
