// Return the document's cookies as a Map object.
// Assume that cookie values are encoded with encodeURIComponent().
function getCookies()
{
   // The object we will return
   let cookieMap = new Map();

   // Get all cookieMap in one big string
   let all = document.cookie;

   // Split into individual name/value pairs
   let list = all.split("; ");

   // For each cookie in that list
   for (let cookie of list)
   {
      // Skip if there is no = sign
      if (!cookie.includes("="))
      {
         continue;
      }

      // Find the first = sign
      let eqPos = cookie.indexOf("=");

      // Get cookie cookieName
      let cookieName = cookie.substring(0, eqPos);

      // Get cookie cookieValue
      let cookieValue = cookie.substring(eqPos + 1);

      // Decode the cookieValue
      cookieValue = decodeURIComponent(cookieValue);

      // Remember cookie cookieName and cookieValue
      cookieMap.set(cookieName, cookieValue);
   }

   return cookieMap;
}
