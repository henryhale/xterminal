import { isFunction } from '../helpers';
import { IEffect, IReactive } from '../types';

let observer: IEffect | null;

export function ref<T>(value: T): IReactive<T> {
    const observers = new Set<IEffect>();
    let disposed = false;
    return {
        get value() {
            if (!disposed && isFunction(observer)) observers.add(observer);
            return value;
        },
        set value(newValue) {
            value = newValue;
            if (!disposed) observers.forEach(o => o.call(undefined));
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            observers.clear();
        }
    }
}

export function createEffect(fn: IEffect): void {
    if (!isFunction(fn)) return;
    observer = fn;
    try {
        fn.call(undefined);
    } finally {
        observer = null;
    }
}
