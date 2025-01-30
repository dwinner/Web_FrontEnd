// Определение типа объекта в виде строки

function type(o) {
    var t, c, n;
    return o === null ? "null" : (o !== o ? "nan" : ((t = typeof o) !== "object" ? t : ((c = classof(o)) !== "Object" ? c : (o && o.constructor && typeof o.constructor === "function" && (n = o.constructor.getName()) ? n : "Object"))));
}

function classof(o) {
    return Object.prototype.toString().call(o).slice(8, -1);
}

Function.prototype.getName = function() {
    return "name" in this ? this.name : (this.name = this.toString().match(/function\s*([^(]*)\(/)[1]);
};