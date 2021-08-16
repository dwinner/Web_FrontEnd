var Example = (function () {
    function Example() { }
    Example.padNumber = function padNumber(num, len, char) {
        return this.padString(num.toString(), len, char);
    };
    Example.padString = function padString(input, len, char) {
        if (typeof len === "undefined") { len = 2; }
        if (typeof char === "undefined") { char = '0'; }
        var output = input;
        while(output.length < len) {
            output = char + output;
        }
        return output;
    };
    return Example;
})();
