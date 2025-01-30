using System;
using System.Collections.Generic;

namespace Mvc4KnockoutCRUD.Models
{
   public class ProductRepository : IProductRepository
   {
      private readonly List<Product> _products = new List<Product>();
      private int _nextId = 1;

      public ProductRepository()
      {
         // Add products for the Demonstration
         Add(new Product { Name = "Computer", Category = "Electronics", Price = 23.54M });
         Add(new Product { Name = "Laptop", Category = "Electronics", Price = 33.75M });
         Add(new Product { Name = "iPhone4", Category = "Phone", Price = 16.99M });
      }

      public IEnumerable<Product> GetAll()
      {
         // TODO : Code to get the list of all the records in database
         return _products;
      }

      public Product Get(int id)
      {
         // TODO : Code to find a record in database
         return _products.Find(p => p.Id == id);
      }

      public Product Add(Product item)
      {
         if (item == null)
         {
            throw new ArgumentNullException("item");
         }

         // TODO : Code to save record into database
         item.Id = _nextId++;
         _products.Add(item);

         return item;
      }

      public bool Update(Product item)
      {
         if (item == null)
         {
            throw new ArgumentNullException("item");
         }

         // TODO : Code to update record into database
         var index = _products.FindIndex(p => p.Id == item.Id);
         if (index == -1)
         {
            return false;
         }
         _products.RemoveAt(index);
         _products.Insert(index, item);

         return true;
      }

      public bool Delete(int id)
      {
         // TODO : Code to remove the records from database
         _products.RemoveAll(p => p.Id == id);

         return true;
      }
   }
}