/// <reference path="tsUnit.ts" />
/// <reference path="Calculations.ts" />

module CalculcationsTests {
    export class Composer {
        static compose(test: tsUnit.Test) {
            test.addTestClass(new CalculcationsTests.SimpleMathTests());
        }
    }
    export class SimpleMathTests {
        addTwoNumbers_3and5_8(context: tsUnit.TestContext) {
            var math = new Calculations.SimpleMath();
            var result = math.addTwoNumbers(3, 5);
            context.areIdentical(8, result);
        }
    }
}

class TestRunner {
    private test: tsUnit.Test;
    constructor() {
        this.test = new tsUnit.Test();
        CalculcationsTests.Composer.compose(this.test);
    }
    runInBrowser() {
        this.test.showResults(document.getElementById('results'), this.test.run());
    }
    runInScriptEngine() {
        var result = this.test.run();
        if (result.errors.length > 0) {
            var message = '';
            for (var i = 0; i < result.errors.length; i++) {
                var err = result.errors[i];
                message += err.testName + ' ' + 
                    err.funcName + ' ' + 
                    err.message + '\r\n';
            }
            throw new Error(message);
        }
    }
}

declare var isMsScriptEngineContext: bool;

var testRunner = new TestRunner();
if (!isMsScriptEngineContext) {
    testRunner.runInBrowser();
}

function getResult() {
    testRunner.runInScriptEngine();
}