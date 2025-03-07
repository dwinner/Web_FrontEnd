// Determine if o is an array-like object.
// Strings and functions have numeric length properties, but are
// excluded by the typeof test. In client-side JavaScript, DOM text
// nodes have a numeric length property, and may need to be excluded
// with an additional o.nodeType !== 3 test.
function isArrayLike(o)
{
   return o &&                            // o is not null, undefined, etc.
      typeof o === "object" &&        // o is an object
      Number.isFinite(o.length) &&    // o.length is a finite number
      o.length >= 0 &&                // o.length is non-negative
      Number.isInteger(o.length) &&   // o.length is an integer
      o.length < 4_294_967_295;
}

console.log(isArrayLike([1, 2, 3]));