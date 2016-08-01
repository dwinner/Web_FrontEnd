using System.Web.Optimization;

namespace Less
{
   public static class BundleConfig
   {
      public static void RegisterBundles(BundleCollection bundles)
      {
         var lessBundle = new Bundle("~/Less").IncludeDirectory("~/Styles", "*.less");
         lessBundle.Transforms.Add(new LessTransform());
         lessBundle.Transforms.Add(new CssMinify());

         bundles.Add(lessBundle);
      }
   }
}