// Реализация общих методов объекта

var generic = {
    toString: function () {
        var s = "[";
        if (this.constructor && this.constructor.name) {
            s += this.constructor.name + ": ";
        }

        var n = 0;
        for (var name in this) {
            if (!this.hasOwnProperty(name)) {
                continue;
            }

            var value = this[name];
            if (typeof value === "function") {
                continue;
            }

            if (n++) {
                s += ", ";
            }

            s += name + "=" + value;
        }

        return s + "]";
    },

    equals: function (that) {
        if (that == null) {
            return false;
        }

        if (this.constructor !== that.constructor) {
            return false;
        }

        for (var name in this) {
            if (name === "|**objectid**|") {
                continue;
            }

            if (!this.hasOwnProperty(name)) {
                continue;
            }

            if (this[name] !== that[name]) {
                return false;
            }
        }

        return true;
    }
};