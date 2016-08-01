<!--
var s, c1, c2, r1, g1, b1, r2, g2, b2;
var fTimeout, fObj, fSteps = 25, fDelay = 5;

function Fade(obj, color1, color2) {
  if (fTimeout) {
    clearTimeout(fTimeout);
    if (fObj) fObj.style.color = c2;
  }
  fObj = obj; c1 = color1; c2 = color2;
  r1 = eval('0x' + c1.substring(0,2));
  g1 = eval('0x' + c1.substring(2,4));
  b1 = eval('0x' + c1.substring(4,6));
  r2 = eval('0x' + c2.substring(0,2));
  g2 = eval('0x' + c2.substring(2,4));
  b2 = eval('0x' + c2.substring(4,6));
  s = 0;
  DoFade();
}

function DoFade() {
  var d = s/fSteps, m = 1 - d;
  fObj.style.color = "#"+Dec2Hex(r1*m+r2*d)+Dec2Hex(g1*m+g2*d)+Dec2Hex(b1*m+b2*d);
  if (s < fSteps) 
    fTimeout = setTimeout('DoFade()', fDelay);
  s++;
}
// ѕеревод дес€тичного числа в шестнадцатиричное
function Dec2Hex(Dec) {
  var hexChars = new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
  var a = parseInt(Dec) % 16, b = (parseInt(Dec) - a)/16;
  var hex = "" + hexChars[b] + hexChars[a];
  return hex;
}
//-->
