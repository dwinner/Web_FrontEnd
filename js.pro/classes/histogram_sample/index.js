import {Histogram as Hist} from "./hostogram.mjs";

let histogram = new Hist();

histogram.add('one');
histogram.add('two');
histogram.add('three');
histogram.add('four');
histogram.add('one');
histogram.add('one');

console.log(`Has 'two' key: ${histogram.has('two')}`);
console.log(`Count is ${histogram.size}`);

histogram.delete('four');

console.log(...histogram);
console.log(...histogram.keys());
console.log(...histogram.values());
console.log(...histogram.entries());