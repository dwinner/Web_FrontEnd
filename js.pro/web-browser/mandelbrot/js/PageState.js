/**
 * This class holds the state information necessary to render a Mandelbrot set.
 * The cx and cy properties give the point in the complex plane that is the
 * center of the image. The perPixel property specifies how much the real and
 * imaginary parts of that complex number changes for each pixel of the image.
 * The maxIterations property specifies how hard we work to compute the set.
 * Larger numbers require more computation but produce crisper images.
 * Note that the size of the canvas is not part of the state. Given cx, cy, and
 * perPixel we simply render whatever portion of the Mandelbrot set fits in
 * the canvas at its current size.
 *
 * Objects of this type are used with history.pushState() and are used to read
 * the desired state from a bookmarked or shared URL.
 */
export default class PageState
{
   // This factory method returns an initial state to display the entire set.
   static initialState()
   {
      let pageState = new PageState();
      pageState.cx = -0.5;
      pageState.cy = 0;
      pageState.perPixel = 3 / window.innerHeight;
      pageState.maxIterations = 500;

      return pageState;
   }

   // This factory method obtains state from a URL, or returns null if
   // a valid state could not be read from the URL.
   static fromUrl(url)
   {
      let pageState = new PageState();
      let inputUrl = new URL(url); // Initialize state from the url'pageState search params.
      pageState.cx = parseFloat(inputUrl.searchParams.get("cx"));
      pageState.cy = parseFloat(inputUrl.searchParams.get("cy"));
      pageState.perPixel = parseFloat(inputUrl.searchParams.get("pp"));
      pageState.maxIterations = parseInt(inputUrl.searchParams.get("it"));

      // If we got valid values, return the PageState object, otherwise null.
      return (isNaN(pageState.cx) || isNaN(pageState.cy) || isNaN(pageState.perPixel)
         || isNaN(pageState.maxIterations))
         ? null
         : pageState;
   }

   // This instance method encodes the current state into the search
   // parameters of the browser's current location.
   toUrl()
   {
      let url = new URL(window.location);
      url.searchParams.set("cx", this.cx);
      url.searchParams.set("cy", this.cy);
      url.searchParams.set("pp", this.perPixel);
      url.searchParams.set("it", this.maxIterations);

      return url.href;
   }
}
