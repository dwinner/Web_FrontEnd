var Example = (function () {
    function Example() { }
    Example.pad = function pad(num, len, char) {
        if (typeof len === "undefined") { len = 2; }
        if (typeof char === "undefined") { char = '0'; }
        var output = num.toString();
        while(output.length < len) {
            output = char + output;
        }
        return output;
    };
    return Example;
})();
