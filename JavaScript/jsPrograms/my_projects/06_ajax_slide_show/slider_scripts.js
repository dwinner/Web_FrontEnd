function trim(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "");
}
function changeButtonText(btnId) {
  var btn = document.getElementById(btnId);
  if (btn == null) return;
  if (btn.type != "button") return;
  if (btn.hasChildNodes()) {
    var btnTxtNode = btn.firstChild;
    if (btnTxtNode.nodeType == 3) {
      var btnTxt = btnTxtNode.data;
      if (trim(btnTxt).toString().toLowerCase() == "start")
        btnTxtNode.data = "Stop";
      else if (trim(btnTxt).toString().toLowerCase() == "stop")
        btnTxtNode.data = "Start";
    }
  }
}
function getBoxDim(oDivId) {
  var box = document.getElementById(oDivId);
  if (box) {
    if (box.style && box.style.width && box.style.height) {
      var boxW = box.style.width;
      var boxH = box.style.height;
      return new Array(parseInt(boxW), parseInt(boxH));    
    }
    return false;
  }
  return false;
}
