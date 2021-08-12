let greet = (msg = "hello", name = "world") => {
    console.log (msg, name);
};

greet();
greet ("hey");

let a = [2, 3, 4];
let b = [1, ...a, 5];
console.log (b);

function add (a, b) {
    return a + b;
}

let nums = [5, 4];

console.log (add (...nums));

function f (x, ...y) {
    console.log (y);
    // y is an Array
    return x * y.length;
}

console.log (f (3, "hello", true) === 6);

nums = [4];
console.log (add (5, ...nums));

abort();