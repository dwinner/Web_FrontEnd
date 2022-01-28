var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Utilities;
(function (Utilities) {
    var Logger = (function () {
        function Logger() { }
        Logger.prototype.log = function (message) {
            console.log(message);
        };
        return Logger;
    })();
    Utilities.Logger = Logger;    
    var AnnoyingLogger = (function (_super) {
        __extends(AnnoyingLogger, _super);
        function AnnoyingLogger() {
            _super.apply(this, arguments);

        }
        AnnoyingLogger.prototype.log = function (message) {
            alert(message);
            _super.prototype.log.call(this, message);
        };
        return AnnoyingLogger;
    })(Logger);
    Utilities.AnnoyingLogger = AnnoyingLogger;    
    var Formatter = (function () {
        function Formatter() { }
        Formatter.prototype.someMethod = function () {
        };
        return Formatter;
    })();
    Utilities.Formatter = Formatter;    
})(Utilities || (Utilities = {}));
