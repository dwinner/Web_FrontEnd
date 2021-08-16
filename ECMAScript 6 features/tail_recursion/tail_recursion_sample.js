'use strict';

function factorial(n, acc = 1) {
    return n <= 1 ? acc : factorial(n - 1, n * acc);
}

// Stack overflow in most implementations today,
// but safe on arbitrary inputs in ES6
factorial(100000);
