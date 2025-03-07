// Given an array of iterables, yield their elements in interleaved order.
function* zip(...iterables)
{
   // Get an iterator for each iterable
   let iterators = iterables.map(it => it[Symbol.iterator]());
   let index = 0;
   while (iterators.length > 0)
   {       // While there are still some iterators
      if (index >= iterators.length)
      {    // If we reached the last iterator
         index = 0;                      // go back to the first one.
      }

      let item = iterators[index].next(); // Get next item from next iterator.
      if (item.done)
      {                    // If that iterator is done
         iterators.splice(index, 1);     // then remove it from the array.
      }
      else
      {                              // Otherwise,
         yield item.value;               // yield the iterated value
         index++;                        // and move on to the next iterator.
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
