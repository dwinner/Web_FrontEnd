// This function is like fetch(), but it adds support for a timeout
// property in the options object and aborts the fetch if it is not complete
// within the number of milliseconds specified by that property.
function fetchWithTimeout(url, options = {})
{
   // If the timeout property exists and is nonzero
   if (options.timeout)
   {
      let controller = new AbortController();  // Create a controller
      options.signal = controller.signal;      // Set the signal property
      // Start a timer that will send the abort signal after the specified
      // number of milliseconds have passed. Note that we never cancel
      // this timer. Calling abort() after the fetch is complete has
      // no effect.
      setTimeout(() =>
                 {
                    controller.abort();
                 }, options.timeout);
   }

   // Now just perform a normal fetch
   return fetch(url, options);
}

function fetchWithErrorHandling(url = "/api/users/current")
{
   // Make an HTTP (or HTTPS) GET request.
   fetch(url)
      .then(response =>
            {
               // When we get a response, first check it for a success code and the expected type.
               if (response.ok && response.headers.get("Content-Type") === "application/json")
               {
                  return response.json(); // Return a Promise for the body.
               }
               else
               {
                  // Or throw an error.
                  throw new Error(`Unexpected response status ${response.status} or content type`
                  );
               }
            })
      .then(currentUser =>
            {
               // When the response.json() Promise resolves
               function displayUserInfo(currentUser)
               {
                  console.log(currentUser);
               }

               displayUserInfo(currentUser); // do something with the parsed body.
            })
      .catch(error =>
             {
                // Or if anything went wrong, just log the error.
                // If the user's browser is offline, fetch() itself will reject.
                // If the server returns a bad response then we throw an error above.
                console.log("Error while fetching current user:", error);
             });

}
