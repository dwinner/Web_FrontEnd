using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;

namespace UsingDataTemplates
{
   public partial class Default : Page
   {
      protected void Page_Load(object sender, EventArgs e)
      {
      }

      public IEnumerable<string> GetHtmlLinks()
      {
         var currentPath = Request.MapPath("~/");
         var htmlFiles = Directory.EnumerateFiles(currentPath, "*.html").Select(Path.GetFileName);
         return htmlFiles;
      }

      protected string GetItemName(string item)
      {
         return Path.GetFileNameWithoutExtension(item);
      }
   }
}