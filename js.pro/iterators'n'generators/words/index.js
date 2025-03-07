function yieldWords(aString)
{
   // Match one or more spaces or end
   const wordRe = /\s+|$/g;

   // Start matching at first non-space
   wordRe.lastIndex = aString.match(/[^ ]/).index;

   // Return an iterable iterator object
   return {
      // This makes us iterable
      [Symbol.iterator]()
      {
         return this;
      },
      // This makes us an iterator
      next()
      {
         // Resume where the last match ended
         let start = wordRe.lastIndex;

         // If we're not done
         if (start < aString.length)
         {
            // Match the next word boundary
            let match = wordRe.exec(aString);

            // If we found one, return the word
            if (match)
            {
               return {
                  value: aString.substring(start, match.index)
               };
            }
         }

         // Otherwise, say that we're done
         return {done: true};
      }
   };
}

// => ["abc", "def", "ghi!"]
console.log([...yieldWords(" abc def  ghi! ")]);
