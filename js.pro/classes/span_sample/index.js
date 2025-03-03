require('./range.js');

// This is the constructor function for our subclass
function Span(start, span)
{
   if (span >= 0)
   {
      this.from = start;
      this.to = start + span;
   }
   else
   {
      this.to = start;
      this.from = start + span;
   }
}

// Ensure that the Span prototype inherits from the Range prototype
Span.prototype = Object.create(Range.prototype);

// We don't want to inherit Range.prototype.constructor, so we
// define our own constructor property.
Span.prototype.constructor = Span;

// By defining its own toString() method, Span overrides the
// toString() method that it would otherwise inherit from Range.
Span.prototype.toString = function ()
{
   return `(${this.from}... +${this.to - this.from})`;
};

/*
let range = new Range(1, 3);
console.log(range.includes(2));
console.log(range.toString());
console.log(...range);
 */

let span = new Span(2, 9);
console.log(span.toString());