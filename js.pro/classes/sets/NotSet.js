import AbstractSet from "./AbstractSet.js";

/**
 * NotSet is a concrete subclass of AbstractSet.
 * The members of this set are all values that are not members of some
 * other set. Because it is defined in terms of another set it is not
 * writable, and because it has infinite members, it is not enumerable.
 * All we can do with it is test for membership and convert it to a
 * string using mathematical notation.
 */
export default class NotSet extends AbstractSet
{
   constructor(set)
   {
      super();
      this.set = set;
   }

   /**
    * Returns true if a value is not in the set
    * @param x Value
    * @returns {boolean} true if a value is not in the set, false otherwise
    */
   has(x)
   {
      return !this.set.has(x);
   }

   /**
    * String representation
    * @returns {string} String representation
    */
   toString()
   {
      return `{ x| x ∉ ${this.set.toString()} }`;
   }
}