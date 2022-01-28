var Utilities;
(function (Utilities) {
    var Logger = (function () {
        function Logger(formatter) {
            this.formatter = formatter;
        }
        Logger.prototype.log = function (message) {
            if (typeof window.console !== 'undefined') {
                window.console.log(this.getTimeStamp() + ' - ' + message);
            }
        };
        Logger.prototype.getTimeStamp = function () {
            var now = new Date();
            return this.formatter.pad(now.getHours()) + ':' + this.formatter.pad(now.getMinutes()) + ':' + this.formatter.pad(now.getSeconds()) + ':' + this.formatter.pad(now.getMilliseconds(), 3);
        };
        return Logger;
    })();
    Utilities.Logger = Logger;    
    var Formatter = (function () {
        function Formatter() { }
        Formatter.prototype.pad = function (num, len, char) {
            if (typeof len === "undefined") { len = 2; }
            if (!char) {
                char = '0';
            }
            var output = num.toString();
            while(output.length < len) {
                output = char + output;
            }
            return output;
        };
        return Formatter;
    })();
    Utilities.Formatter = Formatter;    
})(Utilities || (Utilities = {}));
var formatter = new Utilities.Formatter();
var logger = new Utilities.Logger(formatter);
