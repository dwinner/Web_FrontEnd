import AbstractEnumerableSet from "./AbstractEnumerableSet.js";

/**
 * SingletonSet is a concrete subclass of AbstractEnumerableSet.
 * A singleton set is a read-only set with a single member.
 */
export default class SingletonSet extends AbstractEnumerableSet
{
   constructor(member)
   {
      super();
      this.member = member;
   }

   // We implement these three methods, and inherit isEmpty, equals()
   // and toString() implementations based on these methods.
   has(x)
   {
      return x === this.member;
   }

   get size()
   {
      return 1;
   }

   * [Symbol.iterator]()
   {
      yield this.member;
   }
}