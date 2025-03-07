/**
 * A Set-like class that keeps track of how many times a value has
 * been added. Call add() and remove() like you would for a Set, and
 * call count() to find out how many times a given value has been added.
 * The default iterator yields the values that have been added at least
 * once. Use entries() if you want to iterate [value, count] pairs.
 */
class Histogram
{
   #map;

   /**
    * To initialize, we just create a Map object to delegate to
    */
   constructor()
   {
      this.#map = new Map();
   }

   /**
    * For any given key, the count is the value in the Map, or zero if the key does not appear in the Map.
    * @param key Key in the map
    * @returns {any|number} Count of values for key
    */
   count(key)
   {
      return this.#map.get(key) || 0;
   }

   /**
    * The Set-like method has() returns true if the count is non-zero
    * @param key Key
    * @returns {boolean} true if key is presented, false otherwise
    */
   has(key)
   {
      return this.count(key) > 0;
   }

   /**
    * The size of the histogram is just the number of entries in the Map.
    * @returns {number} The size of the histogram
    */
   get size()
   {
      return this.#map.size;
   }

   /**
    * Add the key
    * @param key Key
    */
   add(key)
   {
      this.#map.set(key, this.count(key) + 1);
   }

   /**
    * Delete the key (or decrement by one)
    * @param key Key
    */
   delete(key)
   {
      let count = this.count(key);
      if (count === 1)
      {
         this.#map.delete(key);
      }
      else if (count > 1)
      {
         this.#map.set(key, count - 1);
      }
   }

   /**
    * Self-iterating a Histogram
    * @returns {MapIterator<any>} Iterator of keys
    */
   [Symbol.iterator]()
   {
      return this.#map.keys();
   }


   /**
    * Keys
    * @returns {MapIterator<any>} Key iteration
    */
   keys()
   {
      return this.#map.keys();
   }

   /**
    * Values
    * @returns {MapIterator<any>} Value iteration
    */
   values()
   {
      return this.#map.values();
   }

   /**
    * Map entries
    * @returns {MapIterator<[any, any]>} Entry iteration
    */
   entries()
   {
      return this.#map.entries();
   }
}

export
{
   Histogram
};