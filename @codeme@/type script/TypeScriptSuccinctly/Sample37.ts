module Utilities {
    export interface ILogger {
        log(message: string): void;
    }

    export class Logger {
        log(message: string): void {
            console.log(message);
        }
    }

    export class AnnoyingLogger extends Logger {
        log(message: string): void {
            alert(message);
            super.log(message);
        }
    }

    export class Formatter {
        someMethod() {
        }
    }
}