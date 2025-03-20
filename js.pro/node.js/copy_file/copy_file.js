const fs = require("fs");

// A streaming file copy function, using "flowing mode".
// Copies the contents of the named source file to the named destination file.
// On success, invokes the callback with a null argument. On error,
// invokes the callback with an Error object.
function copyFile(srcFile, dstFile, callback)
{
   let input = fs.createReadStream(srcFile);
   let output = fs.createWriteStream(dstFile);

   // When we get new data, write it to the output stream.
   input.on("data", (chunk) =>
   {
      let hasRoom = output.write(chunk);

      // If the output stream is full then pause the input stream.
      if (!hasRoom)
      {
         input.pause();
      }
   });

   // When we reach the end of input, tell the output stream to end.
   input.on("end", () =>
   {
      output.end();
   });

   // If we get an error on the input, call the callback with the error and quit.
   input.on("error", err =>
   {
      callback(err);
      process.exit();
   });

   // When the output is no longer full, resume data events on the input
   output.on("drain", () =>
   {
      input.resume();
   });

   // If we get an error on the output, call the callback with the error and quit.
   output.on("error", err =>
   {
      callback(err);
      process.exit();
   });

   // When output is fully written call the callback with no error.
   output.on("finish", () =>
   {
      callback(null);
   });
}

// Here's a simple command-line utility to copy files
let from = process.argv[2], to = process.argv[3];
console.log(`Copying file ${from} to ${to}...`);
copyFile(from, to, err =>
{
   if (err)
   {
      console.error(err);
   }
   else
   {
      console.log("done.");
   }
});
