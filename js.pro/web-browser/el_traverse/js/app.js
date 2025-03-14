// Recursively traverse the Document or Element e, invoking the function
// f on e and on each of its descendants
function traverse(e, f)
{
   // Invoke f() on e
   f(e);
   for (let child of e.children)
   {
      // Iterate over the children, and recurse on each one
      traverse(child, f);
   }
}

function traverse2(e, f)
{
   // Invoke f() on e
   f(e);

   // Iterate the children linked-list style
   let child = e.firstElementChild;
   while (child !== null)
   {
      // And recurse
      traverse2(child, f);
      child = child.nextElementSibling;
   }
}
