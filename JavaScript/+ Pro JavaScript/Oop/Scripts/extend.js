/**
 * Вспомогательные функции для перечисления свойств объекта
 */

function extend(o, p) { // Копирование свойств объекта
    for (var prop in p) {
        o[prop] = p[prop];
    }

    return o;
}

function merge(o, p) { // Слияние свойств объекта
    for (var prop in p) {
        if (o.hasOwnProperty(prop)) {
            continue;
        }

        o[prop] = p[prop];
    }

    return o;
}

function restrict(o, p) { // Удаляет из объекта о свойства, отсутствующие в объекте р
    for (var prop in o) {
        if (!(prop in p)) {
            delete o[prop];
        }
    }

    return o;
}

function subtract(o, p) { // Удаляет из объекта о свойства, присутствующие в объекте р
    for (var prop in p) {
        delete o[prop];
    }

    return o;
}

function union(o, p) {
    return extend(extend({}, o), p);
}

function intersection(o, p) {
    return restrict(extend({}, o), p);
}

function keys(o) {
    if (o == null || typeof o !== "object") {
        throw TypeError();
    }

    var result = [];
    for (var prop in o) {
        if (o.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }

    return result;
}

Object.defineProperty(Object.prototype, "extend", {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var names = Object.getOwnPropertyNames(o);
        for (var i = 0; i < names.length; i++) {
            if (names[i] in this) {
                continue;
            }

            var desc = Object.getOwnPropertyDescriptor(o, names[i]);
            Object.defineProperty(this, names[i], desc);
        }
    }
});

function classof(o) {
    return o === null ? "Null" : (o === undefined ? "Undefined" : Object.prototype.toString().call(o).slice(8, -1));
}