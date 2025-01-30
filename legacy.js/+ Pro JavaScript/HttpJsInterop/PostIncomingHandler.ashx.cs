using System.IO;
using System.Web;

namespace HttpJsInterop
{
   public class PostIncomingHandler : IHttpHandler
   {
      public bool IsReusable
      {
         get { return false; }
      }

      public void ProcessRequest(HttpContext context)
      {
         var incomingStream = context.Request.InputStream;
         string incomingMessage;
         using (var reader = new StreamReader(incomingStream))
         {
            incomingMessage = reader.ReadToEnd();
         }

         context.Response.ContentType = "text/plain";
         context.Response.Write(string.Format("You say: {0}", incomingMessage));
      }
   }
}