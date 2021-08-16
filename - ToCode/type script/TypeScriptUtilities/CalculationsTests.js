var CalculcationsTests;
(function (CalculcationsTests) {
    var Composer = (function () {
        function Composer() { }
        Composer.compose = function compose(test) {
            test.addTestClass(new CalculcationsTests.SimpleMathTests());
        }
        return Composer;
    })();
    CalculcationsTests.Composer = Composer;    
    var SimpleMathTests = (function () {
        function SimpleMathTests() { }
        SimpleMathTests.prototype.addTwoNumbers_3and5_8 = function (context) {
            var math = new Calculations.SimpleMath();
            var result = math.addTwoNumbers(3, 5);
            context.areIdentical(8, result);
        };
        return SimpleMathTests;
    })();
    CalculcationsTests.SimpleMathTests = SimpleMathTests;    
})(CalculcationsTests || (CalculcationsTests = {}));

var TestRunner = (function () {
    function TestRunner() {
        this.test = new tsUnit.Test();
        CalculcationsTests.Composer.compose(this.test);
    }
    TestRunner.prototype.runInBrowser = function () {
        this.test.showResults(document.getElementById('results'), this.test.run());
    };
    TestRunner.prototype.runInScriptEngine = function () {
        var result = this.test.run();
        if(result.errors.length > 0) {
            var message = '';
            for(var i = 0; i < result.errors.length; i++) {
                var err = result.errors[i];
                message += err.testName + ' ' + err.funcName + ' ' + err.message + '\r\n';
            }
            throw new Error(message);
        }
    };
    return TestRunner;
})();
var testRunner = new TestRunner();
if(!isMsScriptEngineContext) {
    testRunner.runInBrowser();
}
function getResult() {
    testRunner.runInScriptEngine();
}
