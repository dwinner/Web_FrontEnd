// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to)
{
   // Store the start and end points (state) of this new range object.
   // These are non-inherited properties that are unique to this object.
   this.from = from;
   this.to = to;
}

// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.
Range.prototype =
   {
      // Return true if x is in the range, false otherwise
      // This method works for textual and Date ranges as well as numeric.
      includes: function (x)
      {
         return this.from <= x && x <= this.to;
      },

      // A generator function that makes instances of the class iterable.
      // Note that it only works for numeric ranges.
      [Symbol.iterator]: function* ()
      {
         for (let x = Math.ceil(this.from); x <= this.to; x++)
         {
            yield x;
         }
      },

      // Return a string representation of the range
      toString: function ()
      {
         return `(${this.from}...${this.to})`;
      }
   };

// example
let range = new Range(1, 3);
console.log(range.includes(2));
console.log(range.toString());
console.log(...range);