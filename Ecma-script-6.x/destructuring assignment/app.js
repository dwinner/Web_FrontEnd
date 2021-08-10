let [a,, b] = [1, 2, 3];
console.log ("a:", a, "b:", b);

var { foo, bar } = { foo: "lorem", bar: "ipsum", choo: "uhoh" };
console.log ("foo:", foo, "bar:", bar);

function f ([name, val]) {
    console.log (name, val);
}

function g ({ name: n, val: v }) {
    console.log (n, v);
}

function h ({ name, val }) {
    console.log (name, val);
}

f (["bar", 42]);
g ({ name: "foo", val: 7 });
h ({ name: "bar", val: 42 });

let cust = {
    name: "Acme Corp.",
    address: {
        street: "1001 Oak Drive",
        city: "Summerville",
        state: "OR",
        zip: "97123"
    }
};
let { address: { city: city }, address: { state: state } } = cust;
console.log ("City:", city, "\nState:", state);

let list = [7, 42];
/*let */
[a = 1, b = 2, c = 3, d] = list;
console.log ("a:", a, "\nb:", b, "\nc:", c, "\nd:", d);

abort();