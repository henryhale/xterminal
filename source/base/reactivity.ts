import { isFunction } from "../helpers";
import { IEffect, IReactive } from "./types";

/**
 * Reactivity
 * => https://github.com/henryhale/reactivity
 */

let observer: IEffect | null;

/**
 * Function that creates a disposable reactive object from a primitive value
 * @param value The primitive value (initial)
 * @returns Reactive object
 */
export function ref<T>(value: T): IReactive<T> {
    const observers = new Set<IEffect>();
    let disposed = false;
    return {
        get value() {
            // allow subscriptons only when the object is not disposed
            if (!disposed && isFunction(observer)) {
                observers.add(observer);
            }
            return value;
        },
        set value(newValue) {
            value = newValue;
            // alert subscribers only when the object is not disposed
            if (!disposed) {
                observers.forEach((o) => o.call(undefined));
            }
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            // remove all subscriptions
            observers.clear();
        }
    };
}

/**
 * Function that opens a subscription to reactive values
 * @param fn The subscription (function) to be made
 */
export function createEffect(fn: IEffect): void {
    if (!isFunction(fn)) return;
    observer = fn;
    try {
        fn.call(undefined);
    } finally {
        observer = null;
    }
}
