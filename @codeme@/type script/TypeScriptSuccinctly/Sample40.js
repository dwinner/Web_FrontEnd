var logger = new Utilities.AnnoyingLogger();
var isLoggerA = logger instanceof Utilities.Logger;
var isLoggerB = logger instanceof Utilities.AnnoyingLogger;
var isLoggerC = logger instanceof Utilities.Formatter;
