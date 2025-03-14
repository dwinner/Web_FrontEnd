// Set the onload property of the Window object to a function.
function isFormValid(form)
{
   return true;
}

// The function is the event handler: it is invoked when the document loads.
window.onload = function ()
{
   // Look up a <form> element
   let form = document.querySelector("form#shipping");

   // Register an event handler function on the form that will be invoked
   // before the form is submitted. Assume isFormValid() is defined elsewhere.
   form.onsubmit = function (event)
   {
      // When the user submits the form
      if (!isFormValid(this))
      {
         // check whether form inputs are valid, and if not, prevent form submission.
         event.preventDefault();
      }
   };
};
