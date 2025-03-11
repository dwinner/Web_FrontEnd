function classof(o)
{
   return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof(null));       // => "Null"
console.log(classof(undefined));  // => "Undefined"
console.log(classof(1));          // => "Number"
console.log(classof(10n ** 100n));  // => "BigInt"
console.log(classof(""));         // => "String"
console.log(classof(false));      // => "Boolean"
console.log(classof(Symbol()));   // => "Symbol"
console.log(classof({}));         // => "Object"
console.log(classof([]));         // => "Array"
console.log(classof(/./));        // => "RegExp"
console.log(classof(() =>
                    {
                    }));     // => "Function"
console.log(classof(new Map()));  // => "Map"
console.log(classof(new Set()));  // => "Set"
console.log(classof(new Date())); // => "Date"

class Range
{
   #low;
   #high;

   constructor(low, high)
   {
      this.#low = low;
      this.#high = high;
   }

   get [Symbol.toStringTag]()
   {
      return "Range";
   }

   // the rest of this class is omitted here
}

let range = new Range(1, 10);
console.log(Object.prototype.toString.call(range));   // => "[object Range]"
console.log(classof(range));                          // => "Range"
