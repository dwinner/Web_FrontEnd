/// <reference path="~/Scripts/inherit.js" />

function range(from, to) { // Конструктор
    var r = inherit(range.methods);
    r.from = from;
    r.to = to;
    return r;
}

range.methods = {   // Методы
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    foreach: function (f) {        
        for (var x = Math.ceil(this.from) ; x <= this.to; x++) {
            console.log(x); // f(x);
        }
    },
    toString: function () {
        return "(" + this.from + ".." + this.to + ")";
    }
};