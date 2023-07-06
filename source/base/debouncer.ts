import { isFunction } from "../helpers";

/**
 * Debouncing functions
 *
 * https://www.freecodecamp.org/news/javascript-debounce-example
 *
 * https://programmingwithmosh.com/javascript/javascript/throttle-and-debounce-patterns/
 */

const DEBOUNCE_TIME = 0;

export function bounce(fn: TimerHandler, ...args: unknown[]): number {
    return setTimeout(fn, DEBOUNCE_TIME, ...args);
}

/**
 * Delay the execution of the function until a pause happens
 * @param fn The function to execute
 * @returns A function that limits the intermediate calls to `fn`
 */
export function debounce(fn: TimerHandler) {
    let flag: number;
    return (...args: unknown[]) => {
        if (!isFunction(fn)) return;
        clearTimeout(flag);
        flag = bounce(fn, ...args);
    };
}
