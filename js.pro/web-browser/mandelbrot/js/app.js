// Finally, here's how we set up the canvas. Note that this JavaScript file
// is self-sufficient. The HTML file only needs to include this one <script>.
import MandelbrotCanvas from "./MandelbrotCanvas.js";

let canvas = document.createElement("canvas"); // Create a canvas element
document.body.append(canvas);                  // Insert it into the body
document.body.style = "margin: 0";              // No margin for the <body>
canvas.style.width = "100%";                   // Make canvas as wide as body
canvas.style.height = "100%";                  // and as high as the body.
new MandelbrotCanvas(canvas);                  // And start rendering into it!
