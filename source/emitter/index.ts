import Disposable from "../base/disposable";
import type {
    XEventEmitter as IEventEmitter,
    IEventListener,
    IEventName
} from "../types";
import type { IEmitterState } from "./interface";

/**
 * EventEmitter class
 *
 * https://nodejs.dev/api/events.html
 *
 * https://nodejs.dev/en/learn/the-nodejs-event-emitter/
 */
export default class XEventEmitter extends Disposable implements IEventEmitter {
    constructor() {
        super();
        states.set(this, defaultState());
        this.register({ dispose: () => states.delete(this) });
    }

    public on(eventName: IEventName, listener: IEventListener): void {
        this.register(addEventListener(this, eventName, listener));
    }

    public once(eventName: IEventName, listener: IEventListener): void {
        this.register(addEventListener(this, eventName, listener, true));
    }

    public off(eventName: IEventName, listener: IEventListener): void {
        const all = $(this).store.get(eventName);
        if (all) {
            for (const fn of all) {
                if (fn === listener) {
                    all.delete(listener);
                    break;
                }
            }
        }
    }

    public emit(eventName: IEventName, ...args: unknown[]): void {
        if (this.isDisposed) return;
        const state = $(this);
        if (state.stack.includes(eventName)) return;
        const listeners = state.store.get(eventName);
        if (listeners) {
            state.stack.push(eventName);
            for (const fn of listeners) {
                fn.call(undefined, ...args);
            }
            state.stack.pop();
        }
        return;
    }
}
