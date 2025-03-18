// These constants control the parallelism of the Mandelbrot set computation.
// You may need to adjust them to get optimum performance on your computer.
import WorkerPool from "./WorkerPool.js";
import PageState from "./PageState.js";
import Tile from "./Tile.js";

const ROWS = 3, COLS = 4, NUMWORKERS = navigator.hardwareConcurrency || 2;

// This is the main class of our Mandelbrot set program. Simply invoke the
// constructor function with the <canvas> element to render into. The program
// assumes that this <canvas> element is styled so that it is always as big
// as the browser window.
export default class MandelbrotCanvas
{
   constructor(canvas)
   {
      // Store the canvas, get its context object, and initialize a WorkerPool
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.workerPool = new WorkerPool(NUMWORKERS, "js/mandelbrotWorker.js");

      // Define some properties that we'll use later
      this.tiles = null;          // Subregions of the canvas
      this.pendingRender = null;  // We're not currently rendering
      this.wantsRerender = false; // No render is currently requested
      this.resizeTimer = null;    // Prevents us from resizing too frequently
      this.colorTable = null;     // For converting raw data to pixel values.

      // Set up our event handlers
      this.canvas.addEventListener("pointerdown", e => this.handlePointer(e));
      window.addEventListener("keydown", e => this.handleKey(e));
      window.addEventListener("resize", e => this.handleResize(e));
      window.addEventListener("popstate", e => this.setState(e.state, false));

      // Initialize our state from the URL or start with the initial state.
      this.state = PageState.fromUrl(window.location) || PageState.initialState();

      // Save this state with the history mechanism.
      history.replaceState(this.state, "", this.state.toUrl());

      // Set the canvas size and get an array of tiles that cover it.
      this.setSize();

      // And render the Mandelbrot set into the canvas.
      this.render();
   }

   // Set the canvas size and initialize an array of Tile objects. This
   // method is called from the constructor and also by the handleResize()
   // method when the browser window is resized.
   setSize()
   {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
      this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
   }

   // This function makes a change to the PageState, then re-renders the
   // Mandelbrot set using that new state, and also saves the new state with
   // history.pushState(). If the first argument is a function that function
   // will be called with the state object as its argument and should make
   // changes to the state. If the first argument is an object, then we simply
   // copy the properties of that object into the state object. If the optional
   // second argument is false, then the new state will not be saved. (We
   // do this when calling setState in response to a popstate event.)
   setState(f, save = true)
   {
      // If the argument is a function, call it to update the state.
      // Otherwise, copy its properties into the current state.
      if (typeof f === "function")
      {
         f(this.state);
      }
      else
      {
         for (let property in f)
         {
            this.state[property] = f[property];
         }
      }

      // In either case, start rendering the new state ASAP.
      this.render();

      // Normally we save the new state. Except when we're called with
      // a second argument of false which we do when we get a popstate event.
      if (save)
      {
         history.pushState(this.state, "", this.state.toUrl());
      }
   }

   // This method asynchronously draws the portion of the Mandelbrot set
   // specified by the PageState object into the canvas. It is called by
   // the constructor, by setState() when the state changes, and by the
   // resize event handler when the size of the canvas changes.
   render()
   {
      // Sometimes the user may use the keyboard or mouse to request renders
      // more quickly than we can perform them. We don't want to submit all
      // the renders to the worker pool. Instead, if we're rendering, we'll
      // just make a note that a new render is needed, and when the current
      // render completes, we'll render the current state, possibly skipping
      // multiple intermediate states.
      if (this.pendingRender)
      {
         // If we're already rendering,
         this.wantsRerender = true;   // make a note to rerender later
         return;                      // and don't do anything more now.
      }

      // Get our state variables and compute the complex number for the
      // upper left corner of the canvas.
      let {cx, cy, perPixel, maxIterations} = this.state;
      let x0 = cx - perPixel * this.width / 2;
      let y0 = cy - perPixel * this.height / 2;

      // For each of our ROWS*COLS tiles, call addWork() with a message
      // for the code in mandelbrotWorker.js. Collect the resulting Promise
      // objects into an array.
      let promises = this.tiles.map(tile => this.workerPool.addWork({
                                                                       tile: tile,
                                                                       x0: x0 + tile.x * perPixel,
                                                                       y0: y0 + tile.y * perPixel,
                                                                       perPixel: perPixel,
                                                                       maxIterations: maxIterations
                                                                    }));

      // Use Promise.all() to get an array of responses from the array of
      // promises. Each response is the computation for one of our tiles.
      // Recall from mandelbrotWorker.js that each response includes the
      // Tile object, an ImageData object that includes iteration counts
      // instead of pixel values, and the minimum and maximum iterations
      // for that tile.
      this.pendingRender = Promise.all(promises).then(responses =>
                                                      {

                                                         // First, find the overall max and min iterations over all tiles.
                                                         // We need these numbers so we can assign colors to the pixels.
                                                         let min = maxIterations, max = 0;
                                                         for (let r of responses)
                                                         {
                                                            if (r.min < min)
                                                            {
                                                               min = r.min;
                                                            }

                                                            if (r.max > max)
                                                            {
                                                               max = r.max;
                                                            }
                                                         }

                                                         // Now we need a way to convert the raw iteration counts from the
                                                         // workers into pixel colors that will be displayed in the canvas.
                                                         // We know that all the pixels have between min and max iterations
                                                         // so we precompute the colors for each iteration count and store
                                                         // them in the colorTable array.

                                                         // If we haven't allocated a color table yet, or if it is no longer
                                                         // the right size, then allocate a new one.
                                                         if (!this.colorTable || this.colorTable.length !== maxIterations + 1)
                                                         {
                                                            this.colorTable = new Uint32Array(maxIterations + 1);
                                                         }

                                                         // Given the max and the min, compute appropriate values in the
                                                         // color table. Pixels in the set will be colored fully opaque
                                                         // black. Pixels outside the set will be translucent black with higher
                                                         // iteration counts resulting in higher opacity. Pixels with
                                                         // minimum iteration counts will be transparent and the white
                                                         // background will show through, resulting in a grayscale image.
                                                         if (min === max)
                                                         {                // If all the pixels are the same,
                                                            if (min === maxIterations)
                                                            {
                                                               // Then make them all black
                                                               this.colorTable[min] = 0xFF000000;
                                                            }
                                                            else
                                                            {                      // Or all transparent.
                                                               this.colorTable[min] = 0;
                                                            }
                                                         }
                                                         else
                                                         {
                                                            // In the normal case where min and max are different, use a
                                                            // logarithic scale to assign each possible iteration count an
                                                            // opacity between 0 and 255, and then use the shift left
                                                            // operator to turn that into a pixel value.
                                                            let maxLog = Math.log(1 + max - min);
                                                            for (let i = min; i <= max; i++)
                                                            {
                                                               this.colorTable[i] =
                                                                  (Math.ceil(Math.log(1 + i - min) / maxLog * 255) << 24);
                                                            }
                                                         }

                                                         // Now translate the iteration numbers in each response's
                                                         // ImageData to colors from the colorTable.
                                                         for (let r of responses)
                                                         {
                                                            let iterations = new Uint32Array(r.imageData.data.buffer);
                                                            for (let i = 0; i < iterations.length; i++)
                                                            {
                                                               iterations[i] = this.colorTable[iterations[i]];
                                                            }
                                                         }

                                                         // Finally, render all the imageData objects into their
                                                         // corresponding tiles of the canvas using putImageData().
                                                         // (First, though, remove any CSS transforms on the canvas that may
                                                         // have been set by the pointerdown event handler.)
                                                         this.canvas.style.transform = "";
                                                         for (let r of responses)
                                                         {
                                                            this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
                                                         }
                                                      })
         .catch((reason) =>
                {
                   // If anything went wrong in any of our Promises, we'll log
                   // an error here. This shouldn't happen, but this will help with
                   // debugging if it does.
                   console.error("Promise rejected in render():", reason);
                })
         .finally(() =>
                  {
                     // When we are done rendering, clear the pendingRender flags
                     this.pendingRender = null;

                     // And if render requests came in while we were busy, rerender now.
                     if (this.wantsRerender)
                     {
                        this.wantsRerender = false;
                        this.render();
                     }
                  });
   }

   // If the user resizes the window, this function will be called repeatedly.
   // Resizing a canvas and rerendering the Mandlebrot set is an expensive
   // operation that we can't do multiple times a second, so we use a timer
   // to defer handling the resize until 200ms have elapsed since the last
   // resize event was received.
   handleResize(event)
   {
      // If we were already deferring a resize, clear it.
      if (this.resizeTimer)
      {
         clearTimeout(this.resizeTimer);
      }

      // And defer this resize instead.
      this.resizeTimer = setTimeout(() =>
                                    {
                                       this.resizeTimer = null;  // Note that resize has been handled
                                       this.setSize();           // Resize canvas and tiles
                                       this.render();            // Rerender at the new size
                                    }, 200);
   }

   // If the user presses a key, this event handler will be called.
   // We call setState() in response to various keys, and setState() renders
   // the new state, updates the URL, and saves the state in browser history.
   handleKey(event)
   {
      switch (event.key)
      {
         case "Escape":     // Type Escape to go back to the initial state
            this.setState(PageState.initialState());
            break;
         case "+":          // Type + to increase the number of iterations
            this.setState(s =>
                          {
                             s.maxIterations = Math.round(s.maxIterations * 1.5);
                          });
            break;
         case "-":          // Type - to decrease the number of iterations
            this.setState(s =>
                          {
                             s.maxIterations = Math.round(s.maxIterations / 1.5);
                             if (s.maxIterations < 1)
                             {
                                s.maxIterations = 1;
                             }
                          });
            break;
         case "o":          // Type o to zoom out
            this.setState(s => s.perPixel *= 2);
            break;
         case "ArrowUp":    // Up arrow to scroll up
            this.setState(s => s.cy -= this.height / 10 * s.perPixel);
            break;
         case "ArrowDown":  // Down arrow to scroll down
            this.setState(s => s.cy += this.height / 10 * s.perPixel);
            break;
         case "ArrowLeft":  // Left arrow to scroll left
            this.setState(s => s.cx -= this.width / 10 * s.perPixel);
            break;
         case "ArrowRight": // Right arrow to scroll right
            this.setState(s => s.cx += this.width / 10 * s.perPixel);
            break;
      }
   }

   // This method is called when we get a pointerdown event on the canvas.
   // The pointerdown event might be the start of a zoom gesture (a click or
   // tap) or a pan gesture (a drag). This handler registers handlers for
   // the pointermove and pointerup events in order to respond to the rest
   // of the gesture. (These two extra handlers are removed when the gesture
   // ends with a pointerup.)
   handlePointer(event)
   {
      // The pixel coordinates and time of the initial pointer down.
      // Because the canvas is as big as the window, these event coordinates
      // are also canvas coordinates.
      const x0 = event.clientX, y0 = event.clientY, t0 = Date.now();

      // This is the handler for move events.
      const pointerMoveHandler = event =>
      {
         // How much have we moved, and how much time has passed?
         let dx = event.clientX - x0, dy = event.clientY - y0, dt = Date.now() - t0;

         // If the pointer has moved enough or enough time has passed that
         // this is not a regular click, then use CSS to pan the display.
         // (We will rerender it for real when we get the pointerup event.)
         if (dx > 10 || dy > 10 || dt > 500)
         {
            this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
         }
      };

      // This is the handler for pointerup events
      const pointerUpHandler = event =>
      {
         // When the pointer goes up, the gesture is over, so remove
         // the move and up handlers until the next gesture.
         this.canvas.removeEventListener("pointermove", pointerMoveHandler);
         this.canvas.removeEventListener("pointerup", pointerUpHandler);

         // How much did the pointer move, and how much time passed?
         const dx = event.clientX - x0, dy = event.clientY - y0, dt = Date.now() - t0;
         // Unpack the state object into individual constants.
         const {cx, cy, perPixel} = this.state;

         // If the pointer moved far enough or if enough time passed, then
         // this was a pan gesture, and we need to change state to change
         // the center point. Otherwise, the user clicked or tapped on a
         // point, and we need to center and zoom in on that point.
         if (dx > 10 || dy > 10 || dt > 500)
         {
            // The user panned the image by (dx, dy) pixels.
            // Convert those values to offsets in the complex plane.
            this.setState({cx: cx - dx * perPixel, cy: cy - dy * perPixel});
         }
         else
         {
            // The user clicked. Compute how many pixels the center moves.
            let cdx = x0 - this.width / 2;
            let cdy = y0 - this.height / 2;

            // Use CSS to quickly and temporarily zoom in
            this.canvas.style.transform =
               `translate(${-cdx * 2}px, ${-cdy * 2}px) scale(2)`;

            // Set the complex coordinates of the new center point and
            // zoom in by a factor of 2.
            this.setState(s =>
                          {
                             s.cx += cdx * s.perPixel;
                             s.cy += cdy * s.perPixel;
                             s.perPixel /= 2;
                          });
         }
      };

      // When the user begins a gesture we register handlers for the
      // pointermove and pointerup events that follow.
      this.canvas.addEventListener("pointermove", pointerMoveHandler);
      this.canvas.addEventListener("pointerup", pointerUpHandler);
   }
}
