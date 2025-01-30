let obj = {}, name = "matt", desc = "here we go";
try {
    Object.defineProperty(obj, name, desc);
    // worked.
} catch (e) {
    // error.
}

if (Reflect.defineProperty(obj, name, desc)) {
    // worked
} else {
    // error.
}

obj = {a: 1};
Object.defineProperty(obj, "b", {value: 2});
obj[Symbol("c")] = 3;
console.log(Reflect.ownKeys(obj)); // [ "a", "b", Symbol(c) ]
