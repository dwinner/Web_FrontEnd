using System.Web.Mvc;
using Mvc4KnockoutCRUD.Models;

namespace Mvc4KnockoutCRUD.Controllers
{
   public class ProductController : Controller
   {
      private static readonly IProductRepository Repository = new ProductRepository();

      public ActionResult Product()
      {
         return View();
      }

      public JsonResult GetAllProducts()
      {
         return Json(Repository.GetAll(), JsonRequestBehavior.AllowGet);
      }

      public JsonResult AddProduct(Product item)
      {
         item = Repository.Add(item);
         return Json(item, JsonRequestBehavior.AllowGet);
      }

      public JsonResult EditProduct(int id, Product product)
      {
         product.Id = id;
         return Repository.Update(product) ? Json(Repository.GetAll(), JsonRequestBehavior.AllowGet) : Json(null);
      }

      public JsonResult DeleteProduct(int id)
      {
         return Json(Repository.Delete(id) ? new {Status = true} : new {Status = false}, JsonRequestBehavior.AllowGet);
      }
   }
}