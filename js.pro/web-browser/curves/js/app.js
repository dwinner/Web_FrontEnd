// A utility function to convert angles from degrees to radians
function rads(x)
{
   return Math.PI * x / 180;
}

// Get the context object of the document's canvas element
let canvasCtx = document.querySelector("canvas").getContext("2d");

// Define some graphics attributes and draw the curves
canvasCtx.fillStyle = "#aaa";     // Gray fills
canvasCtx.lineWidth = 2;          // 2-pixel black (by default) lines

// Draw a circle.
// There is no current point, so draw just the circle with no straight
// line from the current point to the start of the circle.
canvasCtx.beginPath();
canvasCtx.arc(75, 100, 50,          // Center at (75,100), radius 50
              0, rads(360), false); // Go clockwise from 0 to 360 degrees
canvasCtx.fill();                 // Fill the circle
canvasCtx.stroke();               // Stroke its outline.

// Now draw an ellipse in the same way
canvasCtx.beginPath();            // Start new path not connected to the circle
canvasCtx.ellipse(200, 100, 50, 35, rads(15),  // Center, radii, and rotation
                  0, rads(360), false);        // Start angle, end angle, direction

// Draw a wedge. Angles are measured clockwise from the positive x axis.
// Note that arc() adds a line from the current point to the arc start.
canvasCtx.moveTo(325, 100);       // Start at the center of the circle.
canvasCtx.arc(325, 100, 50,       // Circle center and radius
              rads(-60), rads(0), // Start at angle -60 and go to angle 0
              true);              // counterclockwise
canvasCtx.closePath();            // Add radius back to the center of the circle

// Similar wedge, offset a bit, and in the opposite direction
canvasCtx.moveTo(340, 92);
canvasCtx.arc(340, 92, 42, rads(-60), rads(0), false);
canvasCtx.closePath();

// Use arcTo() for rounded corners. Here we draw a square with
// upper left corner at (400,50) and corners of varying radii.
canvasCtx.moveTo(450, 50);           // Begin in the middle of the top edge.
canvasCtx.arcTo(500, 50, 500, 150, 30);  // Add part of top edge and upper right corner.
canvasCtx.arcTo(500, 150, 400, 150, 20); // Add right edge and lower right corner.
canvasCtx.arcTo(400, 150, 400, 50, 10);  // Add bottom edge and lower left corner.
canvasCtx.arcTo(400, 50, 500, 50, 0);    // Add left edge and upper left corner.
canvasCtx.closePath();               // Close path to add the rest of the top edge.

// Quadratic Bezier curve: one control point
canvasCtx.moveTo(525, 125);                      // Begin here
canvasCtx.quadraticCurveTo(550, 75, 625, 125);   // Draw a curve to (625, 125)
canvasCtx.fillRect(550 - 3, 75 - 3, 6, 6);           // Mark the control point (550,75)

// Cubic Bezier curve
canvasCtx.moveTo(625, 100);                      // Start at (625, 100)
canvasCtx.bezierCurveTo(645, 70, 705, 130, 725, 100); // Curve to (725, 100)
canvasCtx.fillRect(645 - 3, 70 - 3, 6, 6);           // Mark control points
canvasCtx.fillRect(705 - 3, 130 - 3, 6, 6);

// Finally, fill the curves and stroke their outlines.
canvasCtx.fill();
canvasCtx.stroke();
