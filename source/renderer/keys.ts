export function getEventKeyNames(ev: KeyboardEvent): string[] {
    return [ev?.key, ev?.which, ev?.keyCode].map(replaceKeyCode);
}

export const ENTER_KEY = "enter",
    TAB_KEY = "tab",
    ARROW_UP_KEY = "arrowup",
    ARROW_DOWN_KEY = "arrowdown";

function replaceKeyCode(n: number | string): string {
    if (typeof n === "string") {
        return n.toLowerCase();
    }
    return (
        "" +
        (n === 13
            ? ENTER_KEY
            : n === 9
            ? TAB_KEY
            : n === 38
            ? ARROW_UP_KEY
            : n === 40
            ? ARROW_DOWN_KEY
            : n.toString().toLowerCase())
    );
}
