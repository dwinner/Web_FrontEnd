import TypedMap from "./TypedMap.js";

let typedMap = new TypedMap('number', 'string');
typedMap.set(1, "one");
typedMap.set(2, "two");
typedMap.set(3, "three");
console.log(...typedMap);