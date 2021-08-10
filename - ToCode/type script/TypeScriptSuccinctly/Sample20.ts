module Utilities {

    export class Logger {
        log(message: string): void {
            if (typeof window.console !== 'undefined') {
                window.console.log(this.getTimeStamp() + ' - ' + message);
            }
        }

        private getTimeStamp(): string {
            var now = new Date();

            return now.getHours() + ':' +
                now.getMinutes() + ':' +
                now.getSeconds() + ':' +
                now.getMilliseconds();
        }
    }
}
