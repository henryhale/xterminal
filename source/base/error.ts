export class XError extends Error {
    constructor(message: string) {
        message = "[x] " + message;
        super(message);
        this.name = "XTerminalError";
    }
}

export const TARGET_INVALID_ERR =
    "mount: A parent HTMLElement (target) is required";

export const TARGET_NOT_CONNECTED_ERR =
    "'mount' was called on an HTMLElement (target) that is not attached to DOM.";
