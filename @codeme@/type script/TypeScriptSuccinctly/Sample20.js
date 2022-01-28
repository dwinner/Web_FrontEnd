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
            return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
        };
        return Logger;
    })();
    Utilities.Logger = Logger;    
})(Utilities || (Utilities = {}));
