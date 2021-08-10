declare class ExternalLogger {
    log(message: string): void;
}

declare var externalLogger: ExternalLogger;

externalLogger.anything();
