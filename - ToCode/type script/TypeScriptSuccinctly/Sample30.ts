export class Logger {
    constructor(private formatter: Formatter) {
    }

    log(message: string): void {
        if (typeof window.console !== 'undefined') {
            window.console.log(this.getTimeStamp() +
                ' - ' + message);
        }
    }

    private getTimeStamp(): string {
        var now = new Date();

        return this.formatter.pad(now.getHours()) + ':' +
            this.formatter.pad(now.getMinutes()) + ':' +
            this.formatter.pad(now.getSeconds()) + ':' +
            this.formatter.pad(now.getMilliseconds(), 3);
    }
}

export class Formatter {
    pad(num: number, len: number = 2, char?: string): string {
        if (!char) {
            char = '0';
        }

        var output = num.toString();
        while (output.length < len) {
            output = char + output;
        }
        return output;
    }
}
