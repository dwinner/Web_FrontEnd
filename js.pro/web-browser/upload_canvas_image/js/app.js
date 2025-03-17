/**
 * The canvas.toBlob() function is callback-based.
 * @async This is a Promise-based wrapper for it.
 * @param canvas Canvas
 * @returns {Promise<unknown>} future value if canvas image data
 */
async function getCanvasBlob(canvas)
{
   return new Promise((resolve, reject) =>
                      {
                         canvas.toBlob(resolve);
                      });
}

/**
 * Here is how we upload a PNG file from a canvas
 * @param canvas Canvas
 * @returns {Promise<void>}  Response body
 */
async function uploadCanvasImage(canvas)
{
   let pngBlob = await getCanvasBlob(canvas);
   let formData = new FormData();
   formData.set("canvasimage", pngBlob);
   let options = {method: "POST", body: formData};
   let response = await fetch("/upload", options);

   return await response.json();
}
