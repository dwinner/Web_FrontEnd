function* fibonacciSequence()
{
   let x = 0, y = 1;
   for (; ;)
   {
      yield y;
      [x, y] = [y, x + y];  // Note: destructuring assignment
   }
}

// Yield the first n elements of the specified iterable object
function* take(n, iterable)
{
   // Get iterator for iterable object
   let it = iterable[Symbol.iterator]();
   while (n-- > 0)
   {
      // Loop n times:
      let next = it.next();  // Get the next item from the iterator.
      if (next.done)
      {
         // If there are no more values, return early
         return;
      }
      else
      {
         // otherwise, yield the value
         yield next.value;
      }
   }
}

// An array of the first 5 Fibonacci numbers
console.log([...take(5, fibonacciSequence())]); // => [1, 1, 2, 3, 5]
