function* oneDigitPrimes()
{
   yield 1;
   yield 2;
   yield 3;
   yield 5;
   yield 7;

   return "done";
}

function* sequence(...iterables)
{
   for (let iterable of iterables)
   {
      yield* iterable;
   }
}

console.log([...sequence("abc", oneDigitPrimes())]);
