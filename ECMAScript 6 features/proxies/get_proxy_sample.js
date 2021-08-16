const target = {};
const handler = {
    get: function (receiver, name) {
        return `Hello, ${name}!`;
    }
};

const p = new Proxy(target, handler);
console.log(p.world === 'Hello, world!');
