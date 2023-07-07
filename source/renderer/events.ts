import { IDisposable } from "../base/types";

export const ENTER_KEY = "Enter",
    TAB_KEY = "Tab",
    ARROW_UP_KEY = "ArrowUp",
    ARROW_DOWN_KEY = "ArrowDown";

/**
 * Attaches an event listener to the element returning a disposable object
 * to remove the event listener
 */
export function addEvent(
    el: Element | Document,
    type: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (e: any) => void,
    opt?: boolean
): IDisposable {
    el.addEventListener(type, handler, opt);
    let disposed = false;
    return {
        dispose() {
            if (disposed) return;
            el.removeEventListener(type, handler, opt);
            disposed = true;
        }
    };
}
