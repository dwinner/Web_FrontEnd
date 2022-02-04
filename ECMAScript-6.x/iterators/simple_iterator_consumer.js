import {fibonacci} from "./simple_iterator.js"

for (var n of fibonacci) {
    // truncate the sequence at 100
    if (n > 100)
        break;

    console.log(n);
}
