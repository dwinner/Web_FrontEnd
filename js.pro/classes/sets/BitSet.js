import AbstractWritableSet from "./AbstractWritableSet.js";

/**
 * A BitSet is a concrete subclass of AbstractWritableSet with a
 * very efficient fixed-size set implementation for sets whose
 * elements are non-negative integers less than some maximum size.
 */
class BitSet extends AbstractWritableSet
{
   constructor(max)
   {
      super();
      this.max = max;  // The maximum integer we can store.
      this.n = 0;      // How many integers are in the set
      this.numBytes = Math.floor(max / 8) + 1;   // How many bytes we need
      this.data = new Uint8Array(this.numBytes); // The bytes
   }

   // Internal method to check if a value is a legal member of this set
   _valid(x)
   {
      return Number.isInteger(x) && x >= 0 && x <= this.max;
   }

   // Tests whether the specified bit of the specified byte of our
   // data array is set or not. Returns true or false.
   _has(byte, bit)
   {
      return (this.data[byte] & BitSet.bits[bit]) !== 0;
   }

   // Is the value x in this BitSet?
   has(x)
   {
      if (this._valid(x))
      {
         let byte = Math.floor(x / 8);
         let bit = x % 8;
         return this._has(byte, bit);
      }
      else
      {
         return false;
      }
   }

   // Insert the value x into the BitSet
   insert(x)
   {
      if (this._valid(x))
      {               // If the value is valid
         let byte = Math.floor(x / 8);   // convert to byte and bit
         let bit = x % 8;
         if (!this._has(byte, bit))
         {    // If that bit is not set yet
            this.data[byte] |= BitSet.bits[bit]; // then set it
            this.n++;                            // and increment set size
         }
      }
      else
      {
         throw new TypeError("Invalid set element: " + x);
      }
   }

   remove(x)
   {
      if (this._valid(x))
      {
         // If the value is valid
         let byte = Math.floor(x / 8);  // compute the byte and bit
         let bit = x % 8;
         if (this._has(byte, bit))
         {    // If that bit is already set
            this.data[byte] &= BitSet.masks[bit];  // then unset it
            this.n--;                              // and decrement size
         }
      }
      else
      {
         throw new TypeError("Invalid set element: " + x);
      }
   }

   // A getter to return the size of the set
   get size()
   {
      return this.n;
   }

   // Iterate the set by just checking each bit in turn.
   // (We could be a lot more clever and optimize this substantially)
   * [Symbol.iterator]()
   {
      for (let i = 0; i <= this.max; i++)
      {
         if (this.has(i))
         {
            yield i;
         }
      }
   }
}

// Some pre-computed values used by the has(), insert() and remove() methods
BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);
BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);