// Define a function to display the current time
function displayTime()
{
   // Get element with id="clock"
   let clock = document.querySelector("#clock");

   // Get current time
   let now = new Date();

   // Display time in the clock
   clock.textContent = now.toLocaleTimeString();
}

// Display the time right away
displayTime();

// And then update it every second.
setInterval(displayTime, 1_000);
