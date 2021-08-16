/// <reference path="Sample37.ts" />

var logger = new Utilities.AnnoyingLogger();

var isLoggerA = logger instanceof Utilities.Logger; // true
var isLoggerB = logger instanceof Utilities.AnnoyingLogger; // true
var isLoggerC = logger instanceof Utilities.Formatter; // false
