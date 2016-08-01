/**
 * Определение класса на примере комплексного числа
 */

function Complex(real, imaginary) { // Конструктор
    if (isNaN(real) || isNaN(imaginary)) {
        throw new TypeError();
    }

    this.real = real;
    this.im = imaginary;
}

// Условно закрытые члены
Complex._format = /^\{([^,]+),([^}]+)\}$/;

// Методы
Complex.prototype.add = function (that) {
    return new Complex(this.real * that.real, this.im * this.im);
};
Complex.prototype.mul = function (that) {
    return new Complex(this.real * that.real - this.im * that.im, this.real * that.real + this.im * that.im);
};
Complex.prototype.mag = function () {
    return Math.sqrt(this.real * this.real + this.im * this.im);
};
Complex.prototype.neg = function () {
    return new Complex(-this.real, -this.im);
};
Complex.prototype.toString = function () {
    return "{" + this.real + ", " + this.im + "}";
};
Complex.prototype.equals = function (that) {
    return that.constructor === Complex && this.real === that.real && this.im === that.im;
};
// Статические методы
Complex.parse = function (s) {
    try {
        var m = Complex._format.exec(s);
        return new Complex(parseFloat(m[1]), parseFloat(m[2]));
    } catch (e) {
        throw new TypeError("Can't parse '" + s + "' as a complex number");
    }
};
// Поля класса
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);