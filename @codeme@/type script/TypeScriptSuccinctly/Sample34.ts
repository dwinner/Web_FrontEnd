export interface ILogger {
    log(message: string): void;
}

export class AnnoyingLogger implements ILogger {
    log(message: string): void {
        alert(message);
    }
}
