// This object generates strictly increasing serial numbers
const serialNum = {
   // This data property holds the next serial number.
   // The _ in the property name hints that it is for internal use only.
   _n: 0,

   // Return the current value and increment it
   get next()
   {
      return this._n++;
   },

   // Set a new value of n, but only if it is larger than current
   set next(n)
   {
      if (n > this._n)
      {
         this._n = n;
      }
      else
      {
         throw new Error("serial number can only be set to a larger value");
      }
   }
};

serialNum.next = 10;    // Set the starting serial number
console.log(serialNum.next);  // => 10
console.log(serialNum.next);  // => 11: different value each time we get next
