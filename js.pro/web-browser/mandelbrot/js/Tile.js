/**
 * This class represents a sub-rectangle of a canvas or image. We use Tiles to
 * divide a canvas into regions that can be processed independently by Workers.
 */
export default class Tile
{
   constructor(x, y, width, height)
   {
      this.x = x;                     // The properties of a Tile object
      this.y = y;                     // represent the position and size
      this.width = width;             // of the tile within a larger
      this.height = height;           // rectangle.
   }

   // This static method is a generator that divides a rectangle of the
   // specified width and height into the specified number of rows and
   // columns and yields numRows*numCols Tile objects to cover the rectangle.
   static* tiles(width, height, numRows, numCols)
   {
      let columnWidth = Math.ceil(width / numCols);
      let rowHeight = Math.ceil(height / numRows);

      for (let row = 0; row < numRows; row++)
      {
         let tileHeight = (row < numRows - 1)
            ? rowHeight                          // height of most rows
            : height - rowHeight * (numRows - 1);  // height of last row
         for (let col = 0; col < numCols; col++)
         {
            let tileWidth = (col < numCols - 1)
               ? columnWidth                    // width of most columns
               : width - columnWidth * (numCols - 1); // and last column

            yield new Tile(col * columnWidth, row * rowHeight,
                           tileWidth, tileHeight);
         }
      }
   }
}
