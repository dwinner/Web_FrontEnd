using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Autocomplete
{
   public class SuggestHandler : IHttpHandler
   {
      private const string QStringParam = "keyword";

      private readonly List<string> _keywords = new List<string>
      {
         "C",
         "C++",
         "Ada",
         "Smalltalk",
         "Pascal",
         "C#",
         "Java",
         "JavaScript",
         "PL/SQL",
         "Haskell",
         "Erlang",
         "CSS",
         "Html",
         "Scala",
         "PHP",
         "Ruby",
         "F#",
         "Assembler",
         "Ada",
         "Fortran"
      };

      public void ProcessRequest(HttpContext context)
      {
         context.Response.Clear();
         context.Response.AppendHeader("Cache-Control", "no-cache, must-revalidate");
         context.Response.AppendHeader("Pragma", "no-cache");

         var keyword = context.Request.QueryString[QStringParam];
         if (!string.IsNullOrWhiteSpace(keyword))
         {
            context.Response.ContentType = "text/xml";
            keyword = keyword.Trim(); // TODO: Обезопасить строку keyword!
            var suggestedWords = _keywords.Where(key => key.Contains(keyword)).ToList();
            var output =
               suggestedWords.Select(sgWord => string.Format("<name>{0}</name>", sgWord))
                  .Aggregate("<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><response>",
                     (current, nameNode) => current + nameNode);
            output += "</response>";
            context.Response.Write(output);
            context.Response.End();
         }
         else
         {
            context.Response.ContentType = "text/plain";
            context.Response.StatusCode = 401;
            context.Response.StatusDescription = "Bad request";
         }
      }

      public bool IsReusable
      {
         get { return false; }
      }
   }
}