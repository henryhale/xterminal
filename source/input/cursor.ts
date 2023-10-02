import type { IReactive } from "../base/reactivity";

/**
 * Get current cursor position in a textbox
 * https://stackoverflow.com/16105482/get-current-cursor-position-in-a-textbox
 */

// TODO: compatibility check
function getCursorPosition<T extends HTMLElement>(field: T): number {
    if ("selectionStart" in field) {
        return field.selectionStart as number;
    }
    return 0;
}

export function updateCursor(
    el: HTMLInputElement,
    data: IReactive<string>,
    ptr: IReactive<number>
) {
    let pos = getCursorPosition(el);
    const len = data.value.length;
    if (pos > len) {
        pos = len;
    } else if (pos < 0) {
        pos = 0;
    }
    ptr.value = pos;
}
