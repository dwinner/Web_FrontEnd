// Asynchronously load and execute a script from a specified URL
// Returns a Promise that resolves when the script has loaded.
function importScript(url)
{

   return new Promise((resolve, reject) =>
                      {
                         // Create a <script> element
                         let scriptEl = document.createElement("script");

                         // Resolve promise when loaded
                         scriptEl.onload = () =>
                         {
                            resolve();
                         };

                         // Reject on failure
                         scriptEl.onerror = (e) =>
                         {
                            reject(e);
                         };

                         // Set the script URL
                         scriptEl.src = url;

                         // Add <script> to document
                         document.head.append(scriptEl);
                      });
}
