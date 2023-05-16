import Disposable from "../base/Disposable";
import { XError } from "../base/Error";
import { isFunction } from "../helpers";
import {
    IDisposable,
    IEventEmitter,
    IEventListener,
    IEventName
} from "../types";

export default class XEventEmitter extends Disposable implements IEventEmitter {
    private _store: Map<IEventName, Set<IEventListener>>;
    private _canEmit: boolean;
    public isEmitting: boolean;

    constructor() {
        super();
        this._store = new Map();
        this._canEmit = true;
        this.isEmitting = false;

        this.register({ dispose: () => this._store.clear() });
    }

    private _addEventListener(
        ev: IEventName,
        listener: IEventListener,
        once = false
    ): IDisposable {
        if (!(typeof ev === "string" || typeof ev == "symbol")) {
            throw new XError(
                "EventEmitter: The event name (first argument) should either be a string or symbol, got '" +
                    typeof ev +
                    "'"
            );
        }
        if (!isFunction(listener)) {
            throw new XError(
                "EventEmitter: The event listener (second argument) is required and must be a function, got " +
                    typeof listener
            );
        }
        const evlistener = !once
            ? listener
            : (arg1?: unknown, arg2?: unknown) => {
                  listener.call(undefined, arg1, arg2);
                  this.off(ev, evlistener);
              };
        if (this._store.has(ev)) {
            this._store.get(ev)?.add(evlistener);
        } else {
            this._store.set(ev, new Set([evlistener]));
        }
        return {
            dispose: () => this.off(ev, evlistener)
        };
    }

    public on(
        eventName: IEventName,
        eventListener: IEventListener
    ): IDisposable {
        return this._addEventListener(eventName, eventListener);
    }

    public once(eventName: IEventName, eventListener: IEventListener): void {
        this._addEventListener(eventName, eventListener, true);
    }

    public off(eventName: IEventName, eventListener: IEventListener): void {
        const all = this._store.get(eventName);
        if (all) {
            const arr = [].slice.call(Array.from(all));
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === eventListener) {
                    all.delete(eventListener);
                    break;
                }
            }
        }
    }

    public emit(eventName: IEventName, arg1?: unknown, arg2?: unknown): this {
        const listeners = this._store.get(eventName);
        if (listeners) {
            this.isEmitting = true;
            for (const fn of listeners) {
                if (!this._canEmit) break;
                fn.call(undefined, arg1, arg2);
            }
            this.isEmitting = false;
        }
        if (!this._canEmit) this._canEmit = true;
        return this;
    }

    public stopEmit(): void {
        if (this.isEmitting) {
            this._canEmit = false;
        }
    }
}
