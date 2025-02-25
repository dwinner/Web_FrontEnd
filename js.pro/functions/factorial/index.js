// Compute factorials and cache results as properties of the function itself.
function factorial(n)
{
   if (Number.isInteger(n) && n > 0)
   {
      // Positive integers only
      if (!(n in factorial))
      {
         // If no cached result, compute and cache it
         factorial[n] = n * factorial(n - 1);
      }

      // Return the cached result
      return factorial[n];
   }
   else
   {
      // If input was bad
      return NaN;
   }
}

factorial[1] = 1;  // Initialize the cache to hold this base case.

console.log(factorial(6)); // => 720
console.log(factorial[5]); // => 120; the call above caches this value

