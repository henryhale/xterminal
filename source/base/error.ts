export class XError extends Error {
    constructor(message: string) {
        message = "[x] " + message;
        super(message);
        this.name = "XTerminalError";
    }
}

export const EVENT_NAME_ERR =
    "EventEmitter: The event name (first argument) should either be a string or symbol";

export const EVENT_FUNC_ERR =
    "EventEmitter: The event listener (second argument) is required and must be a function";

export const TARGET_INVALID_ERR =
    "mount: A parent HTMLElement (target) is required";

export const TARGET_NOT_CONNECTED_ERR =
    "'mount' was called on an HTMLElement (target) that is not attached to DOM.";
