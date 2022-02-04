let target = function () {
    return 'I am the target';
};

let handler = {
    apply: function (receiver, ...args) {
        return 'I am the proxy';
    }
};

let p = new Proxy(target, handler);
console.log(p() === 'I am the proxy');
