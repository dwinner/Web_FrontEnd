var buffer = new ArrayBuffer (8);
console.log (buffer.byteLength);

buffer = new ArrayBuffer (8);
var view = new DataView (buffer);
view.setInt8 (0, 3);
console.log (view.getInt8 (0));

buffer = new ArrayBuffer (8);
view = new DataView (buffer);
view.setInt32 (0, 3);
console.log (view.getInt8 (0));
console.log (view.getInt8 (1));
console.log (view.getInt8 (2));
console.log (view.getInt8 (3));
console.log (view.getInt32 (0));

buffer = new ArrayBuffer (8);

// 32-bit View
var bigView = new Int32Array (buffer);
bigView[0] = 98;
bigView[1] = 128;

for (let value of bigView) {
    console.log (value);
    // 98
    // 128
}

// 16-bit View
var mediumView = new Int16Array (buffer);

for (let value of mediumView) {
    console.log (value);
    // 98
    // 0
    // 128
    // 0
}

// 8-bit View
var smallView = new Int8Array (buffer);

for (let value of smallView) {
    console.log (value);
    // 98
    // 0
    // 0
    // 0
    // -128
    // 0
    // 0
    // 0
}

// 8-bit Unsigned View
var unsignedView = new Uint8Array (buffer);

for (let value of unsignedView) {
    console.log (value);
    // 98
    // 0
    // 0
    // 0
    // 128
    // 0
    // 0
    // 0
}

abort();

/* for File API */
let fileInput = document.getElementById ("fileInput");
let file = fileInput.files[0];
let reader = new FileReader();
reader.readAsArrayBuffer (file);
reader.onload = function () {
    const arrayBuffer = reader.result;
    // process the buffer...
};

/* for XML HTTP handling */
let xhr = new XMLHttpRequest();
xhr.open ("GET", someUrl);
xhr.responseType = "arraybuffer";

xhr.onload = function () {
    const arrayBuffer = xhr.response;
    // process the buffer...
};

xhr.send();

/* for fetch API */
fetch (url)
    .then (request => request.arrayBuffer())
    .then (arrayBuffer => { /* process buffer */ });

/* for Canvas API */
let canvas = document.getElementById ("my_canvas");
let context = canvas.getContext ("2d");
let imageData = context.getImageData (0, 0, canvas.width, canvas.height);
let uint8ClampedArray = imageData.data;

/* for Web-socket API */
let socket = new WebSocket ("ws://127.0.0.1:8081");
socket.binaryType = "arraybuffer";

// Wait until socket is open
socket.addEventListener ("open",
    function (event) {
        // Send binary data
        const typedArray = new Uint8Array (4);
        socket.send (typedArray.buffer);
    });

// Receive binary data
socket.addEventListener ("message",
    function (event) {
        const arrayBuffer = event.data;
        // process the buffer...
    });