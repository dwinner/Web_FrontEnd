// A trivial Array subclass that adds getters for the first and last elements.
class EZArray extends Array
{
   get first()
   {
      return this[0];
   }

   get last()
   {
      return this[this.length - 1];
   }
}

let ezArray = new EZArray();

// => true: subclass instance
console.log(ezArray instanceof EZArray);

// => true: also a superclass instance.
console.log(ezArray instanceof Array);

// a.length == 4; we can use inherited methods
ezArray.push(1, 2, 3, 4);

// => 4: another inherited method
console.log(ezArray.pop());

// => 1: first getter defined by subclass
console.log(ezArray.first);

// => 3: last getter defined by subclass
console.log(ezArray.last);

// => 2: regular array access syntax still works.
console.log(ezArray[1]);

// => true: subclass instance really is an array
console.log(Array.isArray(ezArray));

// => true: subclass inherits static methods, too!
console.log(EZArray.isArray(ezArray));

// EZArray inherits instance methods because EZArray.prototype
// inherits from Array.prototype
console.log(Array.prototype.isPrototypeOf(EZArray.prototype)); // => true

// And EZArray inherits static methods and properties because
// EZArray inherits from Array. This is a special feature of the
// extends keyword and is not possible before ES6.
console.log(Array.isPrototypeOf(EZArray)) // => true
