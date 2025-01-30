let map = new Map();

map.set('foo', 123);
console.log(map.get('foo'));
console.log(map.has('foo'));

console.log(map.delete('foo'));
console.log(map.has('foo'));

map = new Map();
map.set('foo', true);
map.set('bar', false);

console.log(map.size);
map.clear();
console.log(map.size);

map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

map = new Map()
    .set(1, 'one')
    .set(2, 'two')
    .set(3, 'three');

map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

for (let key of map.keys()) {
    console.log(key);
}

for (let value of map.values()) {
    console.log(value);
}

for (let entry of map.entries()) {
    console.log(entry[0], entry[1]);
}

for (let [key, value] of map.entries()) {
    console.log(key, value);
}

let arr = [...map.keys()];
console.log(arr);