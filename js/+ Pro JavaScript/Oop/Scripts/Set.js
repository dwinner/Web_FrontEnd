// Реализация множества в JavaScript

function Set() {    // Конструктор
    this.values = {};
    this.n = 0;
    this.add.apply(this, arguments);
}

// Открытые методы

Set.prototype.add = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = arguments[i];
        var str = Set._valueToString(val);
        if (!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }

    return this;
};

Set.prototype.remove = function () {
    for (var i = 0; i < arguments.length; i++) {
        var val = Set._valueToString(arguments[i]);
        if (this.values.hasOwnProperty(val)) {
            delete this.values[val];
            this.n--;
        }
    }

    return this;
}

Set.prototype.contains = function (value) {
    return this.values.hasOwnProperty(Set._valueToString(value));
}

Set.prototype.size = function () {
    return this.n;
}

Set.prototype.foreach = function (f, context) {
    for (var val in this.values) {
        if (this.values.hasOwnProperty(val)) {
            f.call(context, this.values[val]);
        }
    }
}

// Служебные методы

Set._valueToString = function (value) {
    function objectId(o) {
        var prop = "|**objectid**|";
        if (!o.hasOwnProperty(prop)) {
            o[prop] = Set._valueToString.next++;
        }

        return o[prop];
    }

    switch (value) {
        case undefined:
            return "u";
        case null:
            return "n";
        case true:
            return "t";
        case false:
            return "f";
        default:
            switch (typeof value) {
                case "number":
                    return "#" + value;
                case "string":
                    return "\"" + value;
                default:
                    return "@" + objectId(value);
            }
    }
};

Set._valueToString.next = 100;