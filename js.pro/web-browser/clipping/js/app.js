function polygon(canvas, sideNum, x, y, radius, angle = 0, counterclockwise = false)
{
   // Begin a new subpath at the first vertex, use trigonometry to compute position
   canvas.moveTo(x + radius * Math.sin(angle), y - radius * Math.cos(angle));

   // Angular distance between vertices
   let delta = 2 * Math.PI / sideNum;

   // For each of the remaining vertices
   for (let i = 1; i < sideNum; i++)
   {
      // Adjust angle
      angle += counterclockwise ? -delta : delta;

      // Add line to the next vertex
      canvas.lineTo(x + radius * Math.sin(angle), y - radius * Math.cos(angle));
   }

   // Connect last vertex back to the first
   canvas.closePath();
}

let canvasCtx = document.querySelector('canvas').getContext("2d");

// Define some drawing attributes
canvasCtx.font = "bold 60pt sans-serif";    // Big font
canvasCtx.lineWidth = 2;                    // Narrow lines
canvasCtx.strokeStyle = "#000";             // Black lines

// Outline a rectangle and some text
canvasCtx.strokeRect(175, 25, 50, 325);     // A vertical stripe down the middle
canvasCtx.strokeText("<canvas>", 15, 330);  // Note strokeText() instead of fillText()

// Define a complex path with an interior that is outside.
polygon(canvasCtx, 3, 200, 225, 200);           // Large triangle
polygon(canvasCtx, 3, 200, 225, 100, 0, true);    // Smaller reverse triangle inside

// Make that path the clipping region.
canvasCtx.clip();

// Stroke the path with a 5 pixel line, entirely inside the clipping region.
canvasCtx.lineWidth = 10;       // Half of this 10 pixel line will be clipped away
canvasCtx.stroke();

// Fill the parts with rectangle and text that are inside the clipping region
canvasCtx.fillStyle = "#aaa";             // Light gray
canvasCtx.fillRect(175, 25, 50, 325);     // Fill the vertical stripe
canvasCtx.fillStyle = "#888";             // Darker gray
canvasCtx.fillText("<canvas>", 15, 330);  // Fill the text
