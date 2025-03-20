const fs = require("fs");
const crypto = require("crypto");

// Compute a sha256 hash of the contents of the named file and pass the
// hash (as a string) to the specified error-first callback function.
function sha256(filename, callback)
{
   // The data stream.
   let input = fs.createReadStream(filename);

   // For computing the hash.
   let sha256Hash = crypto.createHash("sha256");

   // When there is data ready to read
   input.on("readable", () =>
   {
      let chunk;

      // Read a chunk, and if non-null, pass it to the sha256Hash, and keep looping until not readable
      while (chunk = input.read())
      {
         sha256Hash.update(chunk);
      }
   });

   // At the end of the stream, compute the hash, and pass it to the callback.
   input.on("end", () =>
   {
      let hash = sha256Hash.digest("hex");
      callback(null, hash);
   });

   // On error, call callback
   input.on("error", callback);
}

// Here's a simple command-line utility to compute the hash of a file
// Pass filename from command line.
sha256(process.argv[2], (err, hash) =>
{
   // If we get an error print it as an error.
   if (err)
   {
      console.error(err.toString());
   }
   else
   {
      // Otherwise, print the hash string.
      console.log(hash);
   }
});
