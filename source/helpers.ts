export const isArray = Array.isArray;

export function isObject(val: unknown): val is object {
    return typeof val === "object" && val !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
    return typeof val === "function";
}

/**
 * Detecting a mobile browser
 * https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
 */

// TODO: compatibility check
export function isMobile(): boolean {
    const _window = window || {};
    const _navigator = navigator || {};
    // Check for touch support
    if ("ontouchstart" in _window || _navigator.maxTouchPoints) {
        // Check for mobile user agent
        if (/Mobi/.test(_navigator.userAgent)) {
            return true;
        }
    }
    return false;
}
