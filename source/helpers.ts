export const isArray = Array.isArray;

export function isObject(val: unknown): val is object {
    return typeof val === "object" && val !== null;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(val: unknown): val is Function {
    return typeof val === "function";
}
