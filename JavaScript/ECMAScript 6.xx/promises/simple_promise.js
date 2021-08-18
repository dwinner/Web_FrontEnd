var p2 = Promise.resolve("foo");
p2.then((res) => console.log(res));

var p = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(4), 2000);
});

p.then((res) => {
    res += 2;
    console.log(res);
});

p.then((res) => console.log(res));

p = new Promise(function (resolve, reject) {
    setTimeout(() => reject("Timed out!"), 2000);
});

p.then((res) => console.log(res),
    (err) => console.log(err));

p = new Promise(function (resolve, reject) {
    setTimeout(() => reject("Timed out!"), 2000);
});

p.then((res) => console.log("Response:", res))
    .catch((err) => console.log("Error:", err));

p = new Promise(function (resolve, reject) {
    setTimeout(() => {
        throw new Error("Error encountered!");
    }, 2000);
});

p.then((res) => console.log("Response:", res))
    .catch((err) => console.log("Error:", err));
