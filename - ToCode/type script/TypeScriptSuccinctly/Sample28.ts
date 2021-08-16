class Example {
    static pad(num: number, len?: number, char?: string);
    static pad(num: string, len?: number, char?: string);
    static pad(num: any, len: number = 2, char: string = '0') {
        var output = num.toString();
        while (output.length < len) {
            output = char + output;
        }
        return output;
    }
}