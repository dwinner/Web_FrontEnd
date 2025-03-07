/**
 * The AbstractSet class defines a single abstract method, has().
 */
export default class AbstractSet
{
   /**
    * Throw an error here so that subclasses are forced to define their own working version of this method.
    * @param x
    */
   has(x)
   {
      throw new Error("Abstract method");
   }
}