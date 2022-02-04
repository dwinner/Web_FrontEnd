let fibonacci = {
    [Symbol.iterator]: function* () {
        let pre = 0, cur = 1;
        for (; ;) {
            let temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
        }
    }
}

for (let n of fibonacci) {
    // truncate the sequence at 100
    if (n > 100)
        break;
    console.log(n);
}

// using deconstruction
fibonacci = {
    * [Symbol.iterator]() {
        let pre = 0, cur = 1;
        for (; ;) {
            [pre, cur] = [cur, pre + cur];
            yield cur;
        }
    }
}

for (let n of fibonacci) {
    if (n > 100)
        break;
    console.log(n);
}
