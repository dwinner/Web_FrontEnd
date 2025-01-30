using System.Web;

namespace Ajax.Level2.SendingData
{   
   public class ProcessRequestHandler : IHttpHandler
   {
      public void ProcessRequest(HttpContext context)
      {         
         // Разрешение для запроса из разных источников
         context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
         var name = context.Request["name"] ?? "no name";
         var lastname = context.Request["lastname"] ?? "no last name";         
         context.Response.ContentType = "text/plain";
         context.Response.Write(string.Format("Your name: {0}. Your last name: {1}", name, lastname));
      }

      public bool IsReusable
      {
         get { return false; }
      }
   }
}