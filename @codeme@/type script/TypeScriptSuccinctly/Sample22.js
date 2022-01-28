var Utilities;
(function (Utilities) {
    var Logger = (function () {
        function Logger() { }
        Logger.prototype.log = function (message) {
            if (typeof window.console !== 'undefined') {
                window.console.log(this.getTimeStamp() + ' - ' + message);
            }
        };
        Logger.prototype.getTimeStamp = function () {
            var now = new Date();
            return Formatter.pad(now.getHours(), 2, '0') + ':' + Formatter.pad(now.getMinutes(), 2, '0') + ':' + Formatter.pad(now.getSeconds(), 2, '0') + ':' + Formatter.pad(now.getMilliseconds(), 3, '0');
        };
        return Logger;
    })();
    Utilities.Logger = Logger;    
    var Formatter = (function () {
        function Formatter() { }
        Formatter.pad = function pad(num, len, char) {
            var output = num.toString();
            while(output.length < len) {
                output = char + output;
            }
            return output;
        };
        return Formatter;
    })();    
})(Utilities || (Utilities = {}));
