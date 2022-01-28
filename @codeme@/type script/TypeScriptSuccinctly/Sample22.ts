module Utilities {

    export class Logger {
        log(message: string): void {
            if (typeof window.console !== 'undefined') {
                window.console.log(this.getTimeStamp() +
                    ' - ' + message);
            }
        }

        private getTimeStamp(): string {
            var now = new Date();

            return Formatter.pad(now.getHours(), 2, '0') + ':' +
                Formatter.pad(now.getMinutes(), 2, '0') + ':' +
                Formatter.pad(now.getSeconds(), 2, '0') + ':' +
                Formatter.pad(now.getMilliseconds(), 3, '0');
        }
    }

    class Formatter {
        static pad(num: number, len: number, char: string): string {
            var output = num.toString();
            while (output.length < len) {
                output = char + output;
            }
            return output;
        }
    }
}
