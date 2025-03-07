import AbstractSet from "./AbstractSet.js";

/**
 * Range set is a concrete subclass of AbstractSet. Its members are
 * all values that are between the from and to bounds, inclusive.
 * Since its members can be floating point numbers, it is not
 * enumerable and does not have a meaningful size.
 */
export default class RangeSet extends AbstractSet
{
   constructor(from, to)
   {
      super();
      this.from = from;
      this.to = to;
   }

   has(x)
   {
      return x >= this.from && x <= this.to;
   }

   toString()
   {
      return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;
   }
}