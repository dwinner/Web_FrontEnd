using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.UI;

namespace Accordion.Widget
{
   public partial class Default : Page
   {
      protected void Page_Load(object sender, EventArgs e)
      {
      }

      public IEnumerable<string> GetHtmlLinks()
      {
         return Directory.EnumerateFiles(Request.MapPath("~/"), "*.html").Select(Path.GetFileName);
      }

      protected string GetItemName(string item)
      {
         var rawItem = Path.GetFileNameWithoutExtension(item);
         return rawItem != null ? rawItem.Substring(rawItem.IndexOf('-') + 1) : item;
      }
   }
}