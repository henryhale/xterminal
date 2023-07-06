import { IDisposable } from "../base/types";

/**
 * Events
 */
export type IEventName = string | symbol;

export interface IEventListener {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any[]): void;
}

interface IAddEventListener<T> {
    (ev: IEventName, listener: IEventListener): T;
}

/**
 * Event Emiiter
 */
export interface IEventEmitter extends IDisposable {
    isEmitting: boolean;
    on: IAddEventListener<IDisposable>;
    once: IAddEventListener<void>;
    off: IAddEventListener<void>;
    emit(ev: IEventName, arg1?: unknown, arg2?: unknown): void;
    stopEmit(): void;
}
