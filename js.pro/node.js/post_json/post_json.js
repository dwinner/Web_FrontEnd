const https = require("https");

/**
 * Convert the body object to a JSON string then HTTPS POST it to the
 * specified API end point on the specified host. When the response arrives,
 * parse the response body as JSON and resolve the returned Promise with
 * that parsed value.
 */
function postJson(host, endPoint, body, port, username, password)
{
   // Return a Promise object immediately, then call resolve or reject
   // when the HTTPS request succeeds or fails.
   return new Promise(
      (resolve, reject) =>
      {
         // Convert the body object to a string
         let bodyText = JSON.stringify(body);

         // Configure the HTTPS request
         let requestOptions = {
            method: "POST",       // Or "GET", "PUT", "DELETE", etc.
            host: host,           // The host to connect to
            path: endPoint,       // The URL path
            headers: {            // HTTP headers for the request
               "Content-Type": "application/json",
               "Content-Length": Buffer.byteLength(bodyText)
            }
         };

         // If a port is specified, use it for the request.
         if (port)
         {
            requestOptions.port = port;
         }

         // If credentials are specified, add an Authorization header.
         if (username && password)
         {
            requestOptions.auth = `${username}:${password}`;
         }

         // Now create the request based on the configuration object
         let request = https.request(requestOptions);

         // Write the body of the POST request and end the request.
         request.write(bodyText);
         request.end();

         // Fail on request errors (such as no network connection)
         request.on("error", e => reject(e));

         // Handle the response when it starts to arrive.
         request.on("response", response =>
         {
            if (response.statusCode !== 200)
            {
               reject(new Error(`HTTP status ${response.statusCode}`));
               // We don't care about the response body in this case, but
               // we don't want it to stick around in a buffer somewhere, so
               // we put the stream into flowing mode without registering
               // a "data" handler so that the body is discarded.
               response.resume();
               return;
            }

            // We want text, not bytes. We're assuming the text will be
            // JSON-formatted but aren't bothering to check the
            // Content-Type header.
            response.setEncoding("utf8");

            // Node doesn't have a streaming JSON parser, so we read the
            // entire response body into a string.
            let body = "";
            response.on("data", chunk =>
            {
               body += chunk;
            });

            // And now handle the response when it is complete.
            response.on("end", () =>
            {
               // When the response is done,
               try
               {
                  // try to parse it as JSON and resolve the result.
                  resolve(JSON.parse(body));
               }
               catch (e)
               {
                  // Or, if anything goes wrong, reject with the error
                  reject(e);
               }
            });
         });
      });
}
