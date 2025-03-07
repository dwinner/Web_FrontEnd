import AbstractSet from "./AbstractSet.js";

/**
 * AbstractEnumerableSet is an abstract subclass of AbstractSet.  It defines
 * an abstract getter that returns the size of the set and also defines an
 * abstract iterator. And it then implements concrete isEmpty(), toString(),
 * and equals() methods on top of those. Subclasses that implement the
 * iterator, the size getter, and the has() method get these concrete
 * methods for free.
 */
export default class AbstractEnumerableSet extends AbstractSet
{
   get size()
   {
      throw new Error("Abstract method");
   }

   [Symbol.iterator]()
   {
      throw new Error("Abstract method");
   }

   isEmpty()
   {
      return this.size === 0;
   }

   toString()
   {
      return `{${Array.from(this).join(", ")}}`;
   }

   equals(set)
   {
      // If the other set is not also Enumerable, it isn't equal to this one
      if (!(set instanceof AbstractEnumerableSet))
      {
         return false;
      }

      // If they don't have the same size, they're not equal
      if (this.size !== set.size)
      {
         return false;
      }

      // Loop through the elements of this set
      for (let element of this)
      {
         // If an element isn't in the other set, they aren't equal
         if (!set.has(element))
         {
            return false;
         }
      }

      // The elements matched, so the sets are equal
      return true;
   }
}