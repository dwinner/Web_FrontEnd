// Find all occurrences of a value x in an array a and return an array
// of matching indexes
function findAll(a, x)
{
   let
      results = [],      // The array of indexes we'll return
      len = a.length,          // The length of the array to be searched
      pos = 0;         // The position to search from
   while (pos < len)
   {
      // While more elements to search...
      pos = a.indexOf(x, pos); // Search
      if (pos === -1)
      {
         // If nothing found, we're done.
         break;
      }

      results.push(pos);       // Otherwise, store index in array
      pos = pos + 1;           // And start next search at next element
   }

   return results;              // Return array of indexes
}

let array = [1, 2, 3, 4, 5, 6, 4];
let el = 4;
const found = findAll(array, el);
console.log(found);
