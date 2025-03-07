import AbstractEnumerableSet from "./AbstractEnumerableSet.js";

/**
 * AbstractWritableSet is an abstract subclass of AbstractEnumerableSet.
 * It defines the abstract methods insert() and remove() that insert and
 * remove individual elements from the set, and then implements concrete
 * add(), subtract(), and intersect() methods on top of those. Note that
 * our API diverges here from the standard JavaScript Set class.
 */
export default class AbstractWritableSet extends AbstractEnumerableSet
{
   insert(x)
   {
      throw new Error("Abstract method");
   }

   remove(x)
   {
      throw new Error("Abstract method");
   }

   add(set)
   {
      for (let element of set)
      {
         this.insert(element);
      }
   }

   subtract(set)
   {
      for (let element of set)
      {
         this.remove(element);
      }
   }

   intersect(set)
   {
      for (let element of this)
      {
         if (!set.has(element))
         {
            this.remove(element);
         }
      }
   }
}