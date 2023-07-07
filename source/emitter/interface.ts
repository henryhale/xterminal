import { IDisposable } from "../base/types";

/**
 * Event Identifier
 */
export type IEventName = string | symbol;

/**
 * Callback function invoked on event dispatch
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IEventListener = (...args: any[]) => void;

/**
 * State of the Event Emitter
 */
export type IEmitterState = {
    store: Map<IEventName, Set<IEventListener>>;
    stack: IEventName[];
};

/**
 * @param ev The event name
 * @param listener The function to invoke when the named event is triggered
 */
type IEventHandler = (ev: IEventName, listener: IEventListener) => void;

/**
 * Event Emiiter
 */
export interface IEventEmitter extends IDisposable {
    /**
     * Attaches a callback function(listener) to a named event emitted by the object
     */
    on: IEventHandler;

    /**
     * Register a listener that is called at most once for a particular event
     *
     * Once the named event is triggered, the listener is called and then unregistered
     */
    once: IEventHandler;

    /**
     * Removes the specified listener from the set of listeners for the named event
     */
    off: IEventHandler;

    /**
     * Triggers the named event, synchronously invoking all functions attached to
     * the event while passing arguments to each callback function (listener)
     * @param ev The event name
     * @param args Arguments to be passed to the callback function (listener)
     */
    emit(ev: IEventName, ...args: unknown[]): void;
}
