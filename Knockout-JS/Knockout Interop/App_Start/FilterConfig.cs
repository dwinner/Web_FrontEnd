using System.Web.Mvc;

namespace Mvc4KnockoutCRUD
{
   public static class FilterConfig
   {
      public static void RegisterGlobalFilters(GlobalFilterCollection filters)
      {
         filters.Add(new HandleErrorAttribute());
      }
   }
}