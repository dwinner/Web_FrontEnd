let first = "john";
let last = "doe";
let obj = { first, last };
console.log (`${obj.first} ${obj.last}`);

function createDog (name, ability) {
    return { type: "animal", name, ability };
}

let a = createDog ("wolf", "bark");
console.log (JSON.stringify (a));

var prop = "foo";
var o = {
    [prop]: "hey",
    ["b" + "ar"]: "there"
};

console.log (o.foo);
console.log (o.bar);

let i = 0;
let b = {
    [`foo${++i}`]: i,
    [`foo${++i}`]: i,
    [`foo${++i}`]: i
};

console.log (b.foo1);
console.log (b.foo2);
console.log (b.foo3);

function foo () {
    return "firstname";
}

let obj1 = {
    foo: "bar",
    [ `prop_${foo()}` ]: 42
};
console.log (JSON.stringify (obj1));

let myMath = {
    add(op1, op2) {
        return a + b;
    },
    subtract(op1, op2) {
        return a - b;
    },
    multiply(op1, op2) {
        return a * b;
    },
    divide(op1, op2) {
        return a / b;
    }
};

console.log (myMath.add (1, 1));