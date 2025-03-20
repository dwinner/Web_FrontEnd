function write(stream, chunk, callback)
{
   // Write the specified chunk to the specified stream
   let hasMoreRoom = stream.write(chunk);

   // Check the return value of the write() method:
   if (hasMoreRoom)
   {
      // If it returned true, then invoke callback asynchronously.
      setImmediate(callback);
   }
   else
   {
      // If it returned false, then invoke callback on drain event.
      stream.once("drain", callback);
   }
}

console.log("once again");