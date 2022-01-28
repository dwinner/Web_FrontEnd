var Utilities;
(function (Utilities) {
    var Logger = (function () {
        function Logger() { }
        Logger.prototype.log = function (message) {
            if (typeof window.console !== 'undefined') {
                window.console.log(message);
            }
        };
        return Logger;
    })();
    Utilities.Logger = Logger;    
})(Utilities || (Utilities = {}));
