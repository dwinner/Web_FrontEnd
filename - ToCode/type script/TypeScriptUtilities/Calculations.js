var Calculations;
(function (Calculations) {
    var SimpleMath = (function () {
        function SimpleMath() { }
        SimpleMath.prototype.addTwoNumbers = function (a, b) {
            return a + b;
        };
        return SimpleMath;
    })();
    Calculations.SimpleMath = SimpleMath;    
})(Calculations || (Calculations = {}));

