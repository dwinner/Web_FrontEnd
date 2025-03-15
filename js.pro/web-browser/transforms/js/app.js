// Shear transform:
//   x' = x + kx*y;
//   y' = ky*x + y;
function shear(canvasCtx, kx, ky)
{
   canvasCtx.transform(1, ky, kx, 1, 0, 0);
}

// Rotate theta radians counterclockwise around the point (x,y)
// This can also be accomplished with a translation, rotate, translate sequence
function rotateAbout(canvasCtx, theta, x, y)
{
   let ct = Math.cos(theta);
   let st = Math.sin(theta);
   canvasCtx.transform(ct, -st, st, ct, -x * ct - y * st + x, x * st - y * ct + y);
}
