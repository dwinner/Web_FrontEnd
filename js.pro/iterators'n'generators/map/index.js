import Range from "./Range.js";

// Return an iterable object that iterates the result of applying f()
// to each value from the source iterable
function map(iterable, func)
{
   let iterator = iterable[Symbol.iterator]();

   // This object is both iterator and iterable
   return {
      [Symbol.iterator]()
      {
         return this;
      },
      next()
      {
         let current = iterator.next();
         if (current.done)
         {
            return current;
         }
         else
         {
            return {
               value: func(current.value)
            };
         }
      }
   };
}

// Map a range of integers to their squares and convert to an array
console.log([...map(new Range(1, 4), x => x * x)]);   // => [1, 4, 9, 16]
