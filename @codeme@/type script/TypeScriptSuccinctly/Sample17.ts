module Utilities {

    export class Logger {
        log(message: string): void {
            if (typeof window.console !== 'undefined') {
                window.console.log(message);
            }
        }
    }
}
