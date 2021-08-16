/*var squareOld = (function(num) {
    return num * num;
}).bind(this);*/


let squareNew = (num) => {
    return num * num;
};

console.log (squareNew (7));

let evens = [2, 4, 6, 8, 10];
let odds = evens.map (v => v + 1);
let nums = evens.map ((v, i) => v + i);

console.log (odds);
console.log (nums);

let fives = [];
nums = [1, 2, 5, 15, 25, 32];
nums.forEach (v => {
    if (v % 5 === 0) {
        fives.push (v);
    }
});

console.log (fives);

let matt = {
    name: "Matt",
    friends: ["Mark", "Lyle", "Rian"],
    printFriends() {
        this.friends.forEach (f =>
            console.log (this.name + " knows " + f));
    }
};
matt.printFriends();

abort();

/* traspiled to es5 */
/*"use strict";

var matt = {
    name: "Matt",
    friends: ["Mark", "Lyle", "Rian"],
    printFriends: function printFriends() {
        var _this = this;

        this.friends.forEach(function (f) {
            return console.log(_this.name + " knows " + f);
        });
    }
};
matt.printFriends();*/