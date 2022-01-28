class Example {
    static padNumber(num: number, len?: number, char?: string) {
        return this.padString(num.toString(), len, char);
    }

    static padString(input: string, len: number = 2, char: string = '0') {
        var output = input;
        while (output.length < len) {
            output = char + output;
        }
        return output;
    }
}