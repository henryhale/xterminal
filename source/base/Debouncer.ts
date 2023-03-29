import { isFunction } from "../helpers";

export function bounce(
    fn: TimerHandler,
    arg1?: unknown,
    arg2?: unknown
): number {
    return setTimeout(fn, 0, arg1, arg2);
}

export function debouncer() {
    let flag: number;
    return (fn: TimerHandler, arg1?: unknown, arg2?: unknown) => {
        if (!isFunction(fn)) return;
        if (flag) clearTimeout(flag);
        flag = bounce(fn, arg1, arg2);
    };
}
