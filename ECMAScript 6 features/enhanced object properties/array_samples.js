Array.of (1); // [1]
Array.of (1, 2, 3); // [1, 2, 3]
Array.of ("a", 7, 12.5); // ["a", 7, 12.5]
Array.of (undefined); // [undefined]

[1, 2, 3, 4, 5].copyWithin (0, 3); // [4, 5, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin (0, 3, 4); // [4, 2, 3, 4, 5]
[1, 2, 3, 4, 5].copyWithin (0, -2, -1); // [4, 2, 3, 4, 5]

var arr = ["a", "b", "c"];
var eArr = arr.entries();
console.log (eArr.next().value); // [0, 'a']
console.log (eArr.next().value); // [1, 'b']
console.log (eArr.next().value); // [2, 'c']

[1, 2, 3].fill (4); // [4, 4, 4]
[1, 2, 3].fill (4, 1); // [1, 4, 4]
[1, 2, 3].fill (4, 1, 2); // [1, 4, 3]
[1, 2, 3].fill (4, 1, 1); // [1, 2, 3]
[1, 2, 3].fill (4, -3, -2); // [4, 2, 3]
[1, 2, 3].fill (4, NaN, NaN); // [1, 2, 3]
Array (3).fill (4); // [4, 4, 4]
[].fill.call ({ length: 3 }, 4); // {0: 4, 1: 4, 2: 4, length: 3}

function isPrime (element, index, array) {
    var start = 2;
    while (start <= Math.sqrt (element)) {
        if (element % start++ < 1) {
            return false;
        }
    }

    return element > 1;
}

console.log ([4, 6, 8, 12].find (isPrime)); // undefined, not found
console.log ([4, 5, 8, 12].find (isPrime)); // 5

console.log ([4, 6, 8, 12].findIndex (isPrime)); // -1, not found
console.log ([4, 6, 7, 12].findIndex (isPrime)); // 2

/*
let nodes = document.querySelectorAll (".business");
nodes.forEach ((item, index, arr) => {
    console.log (item.name);
});
*/

[1, 2, 3].includes (2); // true
[1, 2, 3].includes (4); // false
[1, 2, 3].includes (3, 3); // false
[1, 2, 3].includes (3, -1); // true
[1, 2, NaN].includes (NaN); // true

arr = ["a", "b", "c"];
var iterator = arr.keys();
console.log (iterator.next()); // { value: 0, done: false }
console.log (iterator.next()); // { value: 1, done: false }
console.log (iterator.next()); // { value: 2, done: false }
console.log (iterator.next()); // { value: undefined, done: true }

arr = ["w", "y", "k", "o", "p"];
eArr = arr.values();
// your browser must support for..of loop
// and let-scoped variables in for loops
for (let letter of eArr) {
    console.log (letter);
}

arr = ["w", "y", "k", "o", "p"];
eArr = arr[Symbol.iterator]();
console.log (eArr.next().value); // w
console.log (eArr.next().value); // y
console.log (eArr.next().value); // k
console.log (eArr.next().value); // o
console.log (eArr.next().value); // p


console.log();