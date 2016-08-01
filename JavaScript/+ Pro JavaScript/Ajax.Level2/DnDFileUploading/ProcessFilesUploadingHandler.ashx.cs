using System.Web;

namespace Ajax.Level2.DnDFileUploading
{   
   public class ProcessFilesUploadingHandler : IHttpHandler
   {
      public void ProcessRequest(HttpContext context)
      {
         if (context.Request.Files.Count > 0)
         {
            var files = context.Request.Files;
            for (var i = 0; i < files.Count; i++)
            {
               var postedFile = files[i];
               var serverFilePath =
                  context.Server.MapPath(string.Format("~/FileUploading/uploads/{0}", postedFile.FileName));
               postedFile.SaveAs(serverFilePath);
            }
         }

         context.Response.ContentType = "text/plain";
         context.Response.Write("File(s) Uploaded Successfully!");
      }

      public bool IsReusable
      {
         get { return false; }
      }
   }
}