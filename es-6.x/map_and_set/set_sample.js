let set = new Set();
set.add('red');

console.log(set.has('red'));
set.delete('red');
console.log(set.has('red'));

set = new Set();
set.add('red');
set.add('green');

console.log(set.size);
set.clear();
console.log(set.size);

set = new Set(['red', 'green', 'blue']);

set = new Set()
    .add('red')
    .add('green')
    .add('blue');

set = new Set([NaN]);
console.log(set.size);
console.log(set.has(NaN));

set = new Set(['red', 'green', 'blue']);
for (let x of set) {
    console.log(x);
}

set = new Set(['red', 'green', 'blue']);
let arr = [...set];
console.log(arr);

arr = [3, 5, 2, 2, 5, 5];
let unique = [...new Set(arr)];
for (let x of unique) {
    console.log(x);
}

set = new Set([1, 2, 3]);
set = new Set([...set].map(x => x * 2));
// Resulting set: {2, 4, 6}

set = new Set([1, 2, 3, 4, 5]);
set = new Set([...set].filter(x => (x % 2) === 0));
// Resulting set: {2, 4}
