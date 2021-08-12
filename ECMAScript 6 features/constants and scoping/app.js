// using constants
const pi = 3.141593;
console.log (pi);

// using let instead of var
var submit = function () {
    const x = "foo";
    if (x === "foo") {
        const y = "bar";
    }

    console.log (x);
    //console.log (y);
};

submit();

let shoppingCart = [
    { id: 0, product: "DVD", price: 21.99 },
    { id: 1, product: "CD", price: 11.99 }
];

for (let i = 0; i < shoppingCart.length; i++) {
    let item = shoppingCart[i];
    console.log (`Item: ${item.product} - Price: ${item.price}`);
}

// using y-qualifier in regular expression
var text = "First line\nsecond line";
var regex = /^(\S+) line\n?/y;

var match = regex.exec (text);
console.log (match[1]); // logs 'First'
console.log (regex.lastIndex); // logs '11'

var match2 = regex.exec (text);
console.log (match2[1]); // logs 'Second'
console.log (regex.lastIndex); // logs '22'

var match3 = regex.exec (text);
console.log (match3 === null); // logs 'true'

const token = /\s*(\+|[0-9]+)\s*/y;

function tokenize (tokenRegex, str) {
    const resultArray = [];
    let currentMatch;
    while ((currentMatch = tokenRegex.exec (str))) {
        resultArray.push (currentMatch[1]);
    }

    return resultArray;
}

let result = tokenize (token, "3 + 4");
console.log (JSON.stringify (result));

// unicode qualifier
console.log ("\u{1F680}" === "\uD83D\uDE80");
let codepoint = "\u{1F680}";
console.log (codepoint);