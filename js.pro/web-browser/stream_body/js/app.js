/**
 * An asynchronous function for streaming the body of a Response object
 * obtained from a fetch() request. Pass the Response object as the first
 * argument followed by two optional callbacks.
 *
 * If you specify a function as the second argument, that reportProgress
 * callback will be called once for each chunk that is received. The first
 * argument passed is the total number of bytes received so far. The second
 * argument is a number between 0 and 1 specifying how complete the download
 * is. If the Response object has no "Content-Length" header, however, then
 * this second argument will always be NaN.
 *
 * If you want to process the data in chunks as they arrive, specify a
 * function as the third argument. The chunks will be passed, as Uint8Array
 * objects, to this processChunk callback.
 *
 * streamBody() returns a Promise that resolves to a string. If a processChunk
 * callback was supplied then this string is the concatenation of the values
 * returned by that callback. Otherwise, the string is the concatenation of
 * the chunk values converted to UTF-8 strings.
 */
async function streamBody(response, reportProgress, processChunk)
{
   // How many bytes are we expecting, or NaN if no header
   let expectedBytes = parseInt(response.headers.get("Content-Length"));

   // How many bytes received so far
   let bytesRead = 0;

   // Read bytes with this function
   let reader = response.body.getReader();

   // For converting bytes to text
   let decoder = new TextDecoder("utf-8");

   // Text read so far
   let body = "";

   // Loop until we exit below
   while (true)
   {
      // Read a chunk
      let {done, value} = await reader.read();

      // If we got a byte array:
      if (value)
      {
         // Process the bytes if a callback was passed.
         if (processChunk)
         {
            let processed = processChunk(value);
            if (processed)
            {
               body += processed;
            }
         }
         else
         {
            // Otherwise, convert bytes to text.
            body += decoder.decode(value, {stream: true});
         }

         // If a progress callback was passed, then call it
         if (reportProgress)
         {
            bytesRead += value.length;
            reportProgress(bytesRead, bytesRead / expectedBytes);
         }
      }

      // If this is the last chunk, exit the loop
      if (done)
      {
         break;
      }
   }

   // Return the body text we accumulated
   return body;
}
