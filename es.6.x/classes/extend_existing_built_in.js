function SuperCtor(arg1) {
    //...
}

function SubCtor(arg1, arg2) {
    SuperCtor.call(this, arg1);
}

SubCtor.prototype = Object.create(SuperCtor.prototype);

// Pseudo-code of Array
class Array {
    constructor(...args) { /* ... */
    }

    static [Symbol.create]() {
        // Install special [[DefineOwnProperty]]
        // to magically update 'length'
    }
}

// User code of Array subclass
class MyArray extends Array {
    constructor(...args) {
        super(...args);
    }
}

// Two-phase 'new':
// 1) Call @@create to allocate object
// 2) Invoke constructor on new instance
var arr = new MyArray();
arr[1] = 12;
console.log(arr.length == 2);
console.log(arr);
