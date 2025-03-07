import Range from "./Range.js";

// Return an iterable object that filters the specified iterable,
// iterating only those elements for which the predicate returns true
function filter(iterable, predicate)
{
   let iterator = iterable[Symbol.iterator]();
   return {
      // This object is both iterator and iterable
      [Symbol.iterator]()
      {
         return this;
      },
      next()
      {
         for (; ;)
         {
            let current = iterator.next();
            if (current.done || predicate(current.value))
            {
               return current;
            }
         }
      }
   };
}

// Logs numbers 1 to 10
for (let val of new Range(1, 10))
{
   console.log(val);
}

console.log([...new Range(-2, 2)]);  // => [-2, -1, 0, 1, 2]

// Filter a range so we're left with only even numbers
console.log([...filter(new Range(1, 10), x => x % 2 === 0)]);  // => [2,4,6,8,10]

