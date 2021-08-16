console.log (String.fromCodePoint (42)); // *
console.log (String.fromCodePoint (65, 90)); // AZ

console.log ("ABC".codePointAt (1)); // 66
console.log ("\uD800\uDC00".codePointAt (0)); // 65536

var str = "If you dream it, you can do it.";
console.log (str.startsWith ("If you")); // true
console.log (str.startsWith ("you can do")); // false
console.log (str.startsWith ("you can do", 17)); // true

str = "If you can dream it, you can do it.";
console.log (str.endsWith ("do it.")); // true
console.log (str.endsWith ("you can")); // false
console.log (str.endsWith ("you can", 28)); // true

str = "If you can dream it, you can do it.";
console.log (str.includes ("If you can")); // true
console.log (str.includes ("it.")); // true
console.log (str.includes ("nonexistent")); // false
console.log (str.includes ("If you can", 1)); // false
console.log (str.includes ("IF YOU")); // false

// U+1E9B: Latin small letter long s with dot above
// U+0323: Combining dot below
str = "\u1E9B\u0323";

// Canonically-composed form (NFC)
// U+1E9B: Latin small letter long s with dot above
// U+0323: Combining dot below
str.normalize ("NFC"); // '\u1E9B\u0323'
str.normalize(); // same as above

// Canonically-decomposed form (NFD)
// U+017F: Latin small letter long s
// U+0323: Combining dot below
// U+0307: Combining dot above
str.normalize ("NFD"); // '\u017F\u0323\u0307'

// Compatibly-composed (NFKC)
// U+1E69: Latin small letter s with dot below and dot above
str.normalize ("NFKC"); // '\u1E69'

// Compatibly-decomposed (NFKD)
// U+0073: Latin small letter s
// U+0323: Combining dot below
// U+0307: Combining dot above
str.normalize ("NFKD"); // '\u0073\u0323\u0307'

try {
    "foo".repeat (-1); // RangeError    
} catch (e) {
    console.log (e.message);
}

"foo".repeat (0); // ''
"foo".repeat (1); // 'foo'
"foo".repeat (2); // 'foofoo'
"foo".repeat (2.5); // 'foofoo' (count will be converted to integer)

try {
    "foo".repeat (1 / 0); // RangeError    
} catch (e) {
    console.log (e.message);
}

var string = "A\uD835\uDC68";
var strIter = string[Symbol.iterator]();
console.log (strIter.next().value); // "A"
console.log (strIter.next().value); // "\uD835\uDC68"

console.log();