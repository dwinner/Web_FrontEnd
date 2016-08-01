using System.Web;

namespace HttpJsInterop
{   
   public class GetTextHandler : IHttpHandler
   {
      public void ProcessRequest(HttpContext context)
      {
         context.Response.ContentType = "text/plain";
         context.Response.Write("Server response");
      }

      public bool IsReusable
      {
         get { return false; }
      }
   }
}