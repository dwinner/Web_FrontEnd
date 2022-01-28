class Logger {
}

// exampleA's type is an array of Logger objects

var exampleA: Logger[] = [];
exampleA.push(new Logger());
exampleA.push(new Logger());

// exampleB's type is a function
// It accepts an argument of type string and returns a number

var exampleB: { (input: string): number; };

exampleB = function (input: string) {
    return 1;
};

// exampleC's type is an array of functions
// each function accepts a string and returns a number

var exampleC: { (input: string): number; }[] = [];

function exampleCFunction(input: string): number {
    return 10;
}

exampleC[0] = exampleCFunction;

exampleC[1] = exampleCFunction;
