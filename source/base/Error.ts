export class XError extends Error {
    constructor(message: string) {
        message = "[x] " + message;
        super(message);
        this.name = "XTerminalError";
    }
}
