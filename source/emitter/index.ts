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
    // private store for states
    #state: IEmitterState;

    constructor() {
        super();
        this.#state = {
            stack: [],
            store: new Map()
        };
        this.register({ dispose: () => this.#state.store.clear() });
    }

    public on(eventName: IEventName, listener: IEventListener): void {
        const store = this.#state.store;
        if (store.has(eventName)) {
            store.get(eventName)?.add(listener);
        } else {
            store.set(eventName, new Set([listener]));
        }
    }

    public once(eventName: IEventName, listener: IEventListener): void {
        const evlistener = (...args: unknown[]) => {
            listener.call(undefined, ...args);
            this.off(eventName, evlistener);
        };
        const store = this.#state.store;
        if (store.has(eventName)) {
            store.get(eventName)?.add(evlistener);
        } else {
            store.set(eventName, new Set([evlistener]));
        }
    }

    public off(eventName: IEventName, listener: IEventListener): void {
        const all = this.#state.store.get(eventName);
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
        const stack = this.#state.stack;
        if (stack.includes(eventName)) return;
        const listeners = this.#state.store.get(eventName);
        if (listeners) {
            stack.push(eventName);
            for (const fn of listeners) {
                fn.call(undefined, ...args);
            }
            stack.pop();
        }
        return;
    }
}
