const fs = require("fs");
const zlib = require("zlib");

function gzip(filename, callback)
{
   // Create the streams
   let src = fs.createReadStream(filename);
   let dst = fs.createWriteStream(filename + ".gz");
   let gzipObj = zlib.createGzip();

   // Set up the pipeline
   src.on("error", callback)   // call callback on read error
      .pipe(gzipObj)
      .pipe(dst)
      .on("error", callback)   // call callback on write error
      .on("finish", callback); // call callback when writing is complete
}
