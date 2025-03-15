// Define a regular polygon with n sides, centered at (x,y) with radius r.
// The vertices are equally spaced along the circumference of a circle.
// Put the first vertex straight up or at the specified angle.
// Rotate clockwise, unless the last argument is true.
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

// Assume there is just one canvas, and get its context object to draw with.
let canvasCtx = document.querySelector("canvas").getContext("2d");

// Start a new path and add polygon subpaths
canvasCtx.beginPath();
polygon(canvasCtx, 3, 50, 70, 50);                   // Triangle
polygon(canvasCtx, 4, 150, 60, 50, Math.PI / 4);       // Square
polygon(canvasCtx, 5, 255, 55, 50);                  // Pentagon
polygon(canvasCtx, 6, 365, 53, 50, Math.PI / 6);       // Hexagon
polygon(canvasCtx, 4, 365, 53, 20, Math.PI / 4, true); // Small square inside the hexagon

// Set some properties that control how the graphics will look
canvasCtx.fillStyle = "#ccc";    // Light gray interiors
canvasCtx.strokeStyle = "#008";  // outlined with dark blue lines
canvasCtx.lineWidth = 5;         // five pixels wide.

// Now draw all the polygons (each in its own subpath) with these calls
canvasCtx.fill();                // Fill the shapes
canvasCtx.stroke();              // And stroke their outlines
