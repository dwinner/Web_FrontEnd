// This function writes the specified chunk to the specified stream and
// returns a Promise that will be fulfilled when it is OK to write again.
// Because it returns a Promise, it can be used with await.
function write(stream, chunk)
{
   // Write the specified chunk to the specified stream
   let hasMoreRoom = stream.write(chunk);

   // If buffer is not full, return an already resolved Promise object
   if (hasMoreRoom)
   {
      return Promise.resolve(null);
   }
   else
   {
      // Otherwise, return a Promise that resolves on the drain event.
      return new Promise(resolve =>
                         {
                            stream.once("drain", resolve);
                         });
   }
}

// Copy data from the source stream to the destination stream
// respecting backpressure from the destination stream.
// This is much like calling source.pipe(destination).
async function copy(src, dst)
{
   // Set an error handler on the dst stream in case standard
   // output closes unexpectedly (when piping output to `head`, e.g.)
   dst.on("error", err =>
   {
      console.error(err.stack);
      return process.exit();
   });

   // Use a for/await loop to asynchronously read chunks from the input stream
   for await (let chunk of src)
   {
      // Write the chunk and wait until there is more room in the buffer.
      await write(dst, chunk);
   }
}

// Copy standard input to standard output
copy(process.stdin, process.stdout)
   .then(() => process.exit(0));
