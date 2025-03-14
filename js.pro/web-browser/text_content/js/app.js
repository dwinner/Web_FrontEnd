// Return the plain-text content of element e, recursing into child elements.
// This method works like the getElTextContent property
function getElTextContent(e)
{
   // Accumulate the text here
   let accText = "";
   for (let child = e.firstChild; child !== null; child = child.nextSibling)
   {
      let type = child.nodeType;
      if (type === 3)
      {
         // If it is a Text node, add the text content to our string.
         accText += child.nodeValue;
      }
      else if (type === 1)
      {
         // And if it is an Element node, then recurse.
         accText += getElTextContent(child);
      }
   }

   return accText;
}

document.addEventListener("DOMContentLoaded", event =>
{
   let paraEl = document.querySelector('#para');
   let content = getElTextContent(paraEl);
   console.log(content);
});
