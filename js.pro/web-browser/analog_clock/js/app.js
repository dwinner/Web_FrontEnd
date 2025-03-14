// Update the SVG clock graphic to show current time
(function updateClock()
{
   let now = new Date();                       // Current time
   let sec = now.getSeconds();                 // Seconds
   let min = now.getMinutes() + sec / 60;        // Fractional minutes
   let hour = (now.getHours() % 12) + min / 60;  // Fractional hours
   let minAngle = min * 6;                     // 6 degrees per minute
   let hourAngle = hour * 30;                  // 30 degrees per hour

   // Get SVG elements for the hands of the clock
   let minHand = document.querySelector("#clock .minutehand");
   let hourHand = document.querySelector("#clock .hourhand");

   // Set an SVG attribute on them to move them around the clock face
   minHand.setAttribute("transform", `rotate(${minAngle},50,50)`);
   hourHand.setAttribute("transform", `rotate(${hourAngle},50,50)`);

   // Run this function again in 10 seconds
   setTimeout(updateClock, 10_000);
}()); // Note immediate invocation of the function here.
