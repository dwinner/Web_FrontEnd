// assigning
var obj = { firstname: "matt", lastname: "duffield" };
var copy = Object.assign ({}, obj);
console.log (copy);

var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj2 = Object.assign (o1, o2, o3);
console.log (obj2);
console.log (o1);

var obj3 = {
    foo: 1,
    get bar () {
        return 2;
    }
};

var copy2 = Object.assign ({}, obj3);
console.log (copy2);

function myAssign (target, ...sources) {
    sources.forEach (source => {
        Object.defineProperties (target,
            Object.keys (source).reduce ((descriptors, key) => {
                    descriptors[key] = Object.getOwnPropertyDescriptor (source, key);
                    return descriptors;
                },
                {}));
    });
    return target;
}

var obj4 = {
    foo: 1,
    get bar () {
        return 2;
    }
};

let copy3 = myAssign ({}, obj4);
console.log (copy3);

console.log ("end");