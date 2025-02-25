// This object has accessor properties that return random numbers.
// The expression "random.octet", for example, yields a random number
// between 0 and 255 each time it is evaluated.
const random = {
   get octet()
   {
      return Math.floor(Math.random() * 256);
   },
   get uint16()
   {
      return Math.floor(Math.random() * 65536);
   },
   get int16()
   {
      return Math.floor(Math.random() * 65536) - 32768;
   }
};

console.log(`octet = ${random.octet}`);
console.log(`uint16 = ${random.uint16}`);
console.log(`int16 = ${random.int16}`);