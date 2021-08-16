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

            return Formatter.pad(now.getHours()) + ':' +
                Formatter.pad(now.getMinutes()) + ':' +
                Formatter.pad(now.getSeconds()) + ':' +
                Formatter.pad(now.getMilliseconds(), 3, '0');
        }
    }

    class Formatter {
        static pad(num: number, len: number = 2, char: string = '0'): string {
            var output = num.toString();
            while (output.length < len) {
                output = char + output;
            }
            return output;
        }
    }
}
