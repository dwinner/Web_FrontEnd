var AnnoyingLogger = (function () {
    function AnnoyingLogger() { }
    AnnoyingLogger.prototype.log = function (message) {
        alert(message);
    };
    return AnnoyingLogger;
})();
exports.AnnoyingLogger = AnnoyingLogger;
