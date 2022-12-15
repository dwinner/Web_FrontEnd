/// <reference path="inherit.js" />

function enumeration(namesToValues) {

    var enumeration = function () {
        throw "Can't Instantiate Enumerations";
    };

    var proto = enumeration.prototype = {
        constructor: enumeration,
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };

    enumeration.values = [];

    for (var name in namesToValues) {
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        enumeration[name] = e;
        enumeration.values.push(e);
    }

    enumeration.foreach = function (f, c) {
        for (var i = 0; i < this.values.length; i++) {
            f.call(c, this.values[i]);
        }
    };

    return enumeration;
}