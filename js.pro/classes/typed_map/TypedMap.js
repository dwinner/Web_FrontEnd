export default class TypedMap extends Map
{
   #keyType;
   #valueType;

   get keyType()
   {
      return this._keyType;
   }

   set keyType(value)
   {
      this._keyType = value;
   }

   get valueType()
   {
      return this._valueType;
   }

   set valueType(value)
   {
      this._valueType = value;
   }

   constructor(keyType, valueType, entries)
   {
      // If entries are specified, check their types
      if (entries)
      {
         for (let [key, val] of entries)
         {
            if (typeof key !== keyType || typeof val !== valueType)
            {
               throw new TypeError(`Wrong type for entry [${key}, ${val}]`);
            }
         }
      }

      // Initialize the superclass with the (type-checked) initial entries
      super(entries);

      // And then initialize this subclass by storing the types
      this.#keyType = keyType;
      this.#valueType = valueType;
      this._keyType = keyType;
      this._valueType = valueType;
   }

   // Now redefine the set() method to add type checking for any
   // new entries added to the map.
   set(key, value)
   {
      // Throw an error if the key or value are of the wrong type
      if (this.#keyType && typeof key !== this.#keyType)
      {
         throw new TypeError(`${key} is not of type ${this.#keyType}`);
      }

      if (this.#valueType && typeof value !== this.#valueType)
      {
         throw new TypeError(`${value} is not of type ${this.#valueType}`);
      }

      // If the types are correct, we invoke the super class's version of
      // the set() method, to actually add the entry to the map. And we
      // return whatever the superclass method returns.
      return super.set(key, value);
   }
}
