// Given an array of iterables, yield their elements in interleaved order.
function* zip(...iterables)
{
   // Get an iterator for each iterable
   let iterators = iterables.map(it => it[Symbol.iterator]());
   let index = 0;
   while (iterators.length > 0)
   {
      // While there are still some iterators
      if (index >= iterators.length)
      {
         // If we reached the last iterator go back to the first one.
         index = 0;
      }

      // Get next item from next iterator.
      let item = iterators[index].next();
      if (item.done)
      {
         // If that iterator is done then remove it from the array.
         iterators.splice(index, 1);
      }
      else
      {
         // Otherwise, yield the iterated value and move on to the next iterator.
         yield item.value;
         index++;
      }
   }
}

function* oneDigitPrimes()
{
   yield 1;
   yield 2;
   yield 3;
   yield 5;
   yield 7;

   return "done";
}

// Interleave three iterable objects
console.log([...zip(oneDigitPrimes(), "ab", [0])]);  // => [ 1, 'a', 0, 2, 'b', 3, 5, 7 ]
