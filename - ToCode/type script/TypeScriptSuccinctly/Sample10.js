var Logger = (function () {
    function Logger() { }
    return Logger;
})();
var exampleA = [];
exampleA.push(new Logger());
exampleA.push(new Logger());
var exampleB;
exampleB = function (input) {
    return 1;
};
var exampleC = [];
function exampleCFunction(input) {
    return 10;
}
exampleC[0] = exampleCFunction;
exampleC[1] = exampleCFunction;
