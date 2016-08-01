// Класс для представления диапазонов значений

function Range(from, to) {
    this.from = function () {
        return from;
    };
    this.to = function () {
        return to;
    };
}

Range.prototype = {
    constructor: Range,
    includes: function (x) {
        return this.from() <= x && x <= this.to();
    },
    foreach: function (f) {
        for (var x = Math.ceil(this.from()), max = this.to() ; x <= max; x++) {
            f(x);
        }
    },
    toString: function () {
        return "(" + this.from() + "..." + this.to() + ")";
    }
};