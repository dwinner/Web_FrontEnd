`In JavaScript '\n' is a line-feed.`
    `Now I can do multi-lines
 with template literals.`;

var customer = { name: "Matt" };
var product = { name: "Halo 5: Guardians" };
let gift = { timelimit: "4 hours", amount: 50.00 };
let message = `Dear ${customer.name},\n
Thank you for making a recent purchase of '${product.name}' on Amazon.com.
We would love to get your feedback on your experience.
If you respond in the next ${gift.timelimit}, we will give you a gift
certificate of $${gift.amount} dollars!

We look forward to hearing from you!

Best Regards,

Amazon Customer Relations`;
console.log (message);

let getTotal = (qty, amount) => {
    return qty * amount;
};
message = `Shopping cart total: $${getTotal (2, 2.99)}`;
console.log (message);
message = `Shopping cart total: $${2 * 2.99}`;
console.log (message);

let credentials = "private-user=admin&private-pw=p@$$w0rd";
let a = "one";
let b = "two";
let url = `http://myapp.com/login?a=${a}&b=${b}
   Content-Type: application/json
   X-Credentials: ${credentials}
`;

let post = `POST ${url}`;
console.log (post);

let processMarkup = (aMarkup, aData) => {
    const fields = aMarkup.match (/{(.+?)}/g);
    const args = [];
    const params = [];
    fields.forEach ((field, index, list) => {
        field = field.replace (/{/g, "");
        field = field.replace (/}/g, "");
        args.push (aData[field]);
        params.push (field);
    });
    const lTemplate = aMarkup.replace (/{/g, "${");
    const fn = assemble (lTemplate, params);
    const render = fn.apply (null, args);

    return render;
};

let assemble = (aTemplate, params) => {
    return new Function (params, `return \`${aTemplate}\`;`);
};

let markup = `Hello {fname} {lname}, how are you?`;
let data = { fname: "Matthew", lname: "Duffield" };
let template = processMarkup (markup, data);

console.log (template);
abort();