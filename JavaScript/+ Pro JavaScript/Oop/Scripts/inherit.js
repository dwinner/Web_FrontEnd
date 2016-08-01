/**
 * Создание нового объекта, использующего прототип.
 * NOTE: Может использоваться для защиты оригинального объекта от непреднамеренного изменения
 */

function inherit(p) {
    if (p == null) {
        throw TypeError();
    }

    if (Object.create) {
        return Object.create(p);
    }

    var t = typeof p;
    if (t !== "object" && t !== "function") {
        throw TypeError();
    }

    function f() { }    // Фиктивный конструктор
    f.prototype = p;
    return new f();
}