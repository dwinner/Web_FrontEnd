function addManyNumbers(name) {
    var numbers = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        numbers[_i] = arguments[_i + 1];
    }
    var sum = 0;
    for(var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
}
var result = addManyNumbers('Example', 1, 2, 3, 5, 6, 7, 8, 9);
