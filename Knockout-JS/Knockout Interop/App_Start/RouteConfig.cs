using System.Web.Mvc;
using System.Web.Routing;

namespace Mvc4KnockoutCRUD
{
   public static class RouteConfig
   {
      public static void RegisterRoutes(RouteCollection routes)
      {
         routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
         routes.MapRoute("Default", "{controller}/{action}/{id}",
            new { controller = "Product", action = "Product", id = UrlParameter.Optional });
      }
   }
}