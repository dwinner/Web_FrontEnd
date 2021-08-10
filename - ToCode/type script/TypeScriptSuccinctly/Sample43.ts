declare module ExternalUtilities {
    export class ExternalLogger {
        public totalLogs: number;
        log(message: string): void;
    }
}

var externalLogger = new ExternalUtilities.ExternalLogger();

externalLogger.log("Hello World");
var logCount = externalLogger.totalLogs; 
