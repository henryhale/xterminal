import Disposable from "../base/disposable";
import { IDisposable } from "../base/types";
import { EVENT_FUNC_ERR, EVENT_NAME_ERR, XError } from "../base/error";
import { isFunction } from "../helpers";
import {
    IEventEmitter,
    IEventListener,
    IEventName,
    IEmitterState
} from "./interface";

// private store for states
const states = new WeakMap<XEventEmitter, IEmitterState>();

// Create a new state object
const defaultState = () => {
    return {
        stack: [],
        store: new Map()
    } as IEmitterState;
};

/**
 * Access the state of an event emitter object
 * @param instance The event emitter object
 * @returns The state of that object
 */
function $(instance: XEventEmitter) {
    return states.get(instance) || defaultState();
}

/**
 * Add a callback function that's going to be executed when
 * the event is triggered
 * @param instance The event emitter object
 * @param ev The event to handle the function
 * @param listener The callback function
 * @param once Whether or not this is a one-time callback function
 * @returns Disposable object
 */
function addEventListener(
    instance: XEventEmitter,
    ev: IEventName,
    listener: IEventListener,
    once = false
): IDisposable {
    if (!(typeof ev === "string" || typeof ev == "symbol")) {
        throw new XError(EVENT_NAME_ERR + ", got " + typeof ev);
    }
    if (!isFunction(listener)) {
        throw new XError(EVENT_FUNC_ERR + ", got " + typeof listener);
    }
    const evlistener = !once
        ? listener
        : (...args: unknown[]) => {
              listener.call(undefined, ...args);
              instance.off(ev, evlistener);
          };
    const store = $(instance).store;
    if (store.has(ev)) {
        store.get(ev)?.add(evlistener);
    } else {
        store.set(ev, new Set([evlistener]));
    }
    return {
        dispose: () => instance.off(ev, evlistener)
    };
}

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
