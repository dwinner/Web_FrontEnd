const deg = Math.PI / 180;  // For converting degrees to radians

// Draw a level-n Koch snowflake fractal on the canvas context c,
// with lower-left corner at (x,y) and side length len.
function snowflake(canvasCtx, kochLevel, x, y, len)
{
   canvasCtx.save();           // Save current transformation
   canvasCtx.translate(x, y);   // Translate origin to starting point
   canvasCtx.moveTo(0, 0);      // Begin a new subpath at the new origin
   leg(kochLevel);             // Draw the first leg of the snowflake
   canvasCtx.rotate(-120 * deg); // Now rotate 120 degrees counterclockwise
   leg(kochLevel);             // Draw the second leg
   canvasCtx.rotate(-120 * deg); // Rotate again
   leg(kochLevel);             // Draw the final leg
   canvasCtx.closePath();      // Close the subpath
   canvasCtx.restore();        // And restore original transformation

   // Draw a single leg of a level-kochLevel Koch snowflake.
   // This function leaves the current point at the end of the leg it has
   // drawn and translates the coordinate system so the current point is (0,0).
   // This means you can easily call rotate() after drawing a leg.
   function leg(kochLvl)
   {
      canvasCtx.save();               // Save the current transformation
      if (kochLvl === 0)
      {          // Nonrecursive case:
         canvasCtx.lineTo(len, 0);   //   Just draw a horizontal line
      }                       //                                       _  _
      else
      {                  // Recursive case: draw 4 sub-legs like:  \/
         canvasCtx.scale(1 / 3, 1 / 3);   // Sub-legs are 1/3 the size of this leg
         leg(kochLvl - 1);           // Recurse for the first sub-leg
         canvasCtx.rotate(60 * deg);   // Turn 60 degrees clockwise
         leg(kochLvl - 1);           // Second sub-leg
         canvasCtx.rotate(-120 * deg); // Rotate 120 degrees back
         leg(kochLvl - 1);           // Third sub-leg
         canvasCtx.rotate(60 * deg);   // Rotate back to our original heading
         leg(kochLvl - 1);           // Final sub-leg
      }
      canvasCtx.restore();            // Restore the transformation
      canvasCtx.translate(len, 0);    // But translate to make end of leg (0,0)
   }
}

let canvasCtx = document.querySelector("canvas").getContext("2d");
snowflake(canvasCtx, 0, 25, 125, 125);  // A level-0 snowflake is a triangle
snowflake(canvasCtx, 1, 175, 125, 125); // A level-1 snowflake is a 6-sided star
snowflake(canvasCtx, 2, 325, 125, 125); // etc.
snowflake(canvasCtx, 3, 475, 125, 125);
snowflake(canvasCtx, 4, 625, 125, 125); // A level-4 snowflake looks like a snowflake!
canvasCtx.stroke();                     // Stroke this very complicated path
