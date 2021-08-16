function log(message) {
    if (typeof window.console !== 'undefined') {
        window.console.log(message);
    }
}
var testLog = "Hello world";
log(testLog);
