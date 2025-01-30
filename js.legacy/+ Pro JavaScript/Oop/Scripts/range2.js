// Более чистый пример класса range

function Range(from, to) {
    this.from = from;
    this.to = to;
}

Range.prototype = {
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function () {
        for (var x = Math.ceil(this.from) ; x <= this.to; x++) {
            console.log(x);
        }
    },
    toString: function () {
        return "(" + this.from + "..." + this.to + ")";
    }
};

//var r = new Range(1, 3);