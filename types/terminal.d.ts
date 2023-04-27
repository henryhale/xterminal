/**
 * @author Henry Hale
 * @license MIT
 *
 * This contains the type declarations for the xterminal library. Note that
 * some interfaces differ between this file and the actual implementation in
 * source/, that's because this file declares the *public* API which is intended
 * to be stable and consumed by external programs.
 */

/// <reference lib="dom"/>

declare module "xterminal" {
    /**
     * An object that can be disposed via a dispose function.
     */
    export class IDisposable {
        dispose(): void;
    }

    /**
     * Type of event name.
     */
    export type IEventName = string | symbol;

    /**
     * Callback function invoked when the event is dispatched.
     */
    export interface IEventListener {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (...args: any[]): void;
    }

    /**
     * Adds a `listener` (callback function) to be invoked when the event `ev` is dispatched.
     */
    export interface IAddEventListener<T> {
        (event: IEventName, listener: IEventListener): T;
    }

    /**
     * Event emitter
     *
     * It extends the Disposable class.
     */
    export class IEventEmitter extends IDisposable {
        /**
         * Check whether the instance is currently emitting an event.
         */
        isEmitting: boolean;

        /**
         * Appends a event listener to the specified event.
         *
         * The listener is invoked everytime the event is dispatched.
         *
         * - return disposable object to remove the event listener
         */
        on: IAddEventListener<IDisposable>;

        /**
         * Appends a event listener to the specified event.
         *
         * The listener is invoked _only once_ when the event is dispatched.
         *
         * _It is deleted thereafter._
         */
        once: IAddEventListener<void>;

        /**
         * Removes an event listener from the specified event.
         *
         * The listener won't be invoked on event dispatch thereafter.
         */
        off: IAddEventListener<void>;

        /**
         *
         * @param event The event name to dispatch.
         * @param arg1 data to be passed to the event listener.
         * @param arg2 data to be passed to the event listener.
         */
        emit(event: IEventName, arg1?: unknown, arg2?: unknown): void;

        /**
         * Terminates the currently dispatched event.
         *
         * NB: This waits for the currently executing function, and breaks
         * the loops in which listeners are being invoked.
         *
         * This is useful some cases like, emitting an event during another
         * event's dispatch to achieve more control.
         */
        stopEmit(): void;
    }

    /**
     * Terminal
     */
    export default class Terminal extends IEventEmitter {
        /**
         * Blurs the terminal.
         */
        blur(): void;

        /**
         * Focus the terminal - ready for input.
         */
        focus(): void;

        /**
         * Mounts the terminal instance in the `target` HTMLElement.
         *
         * If the selector is given, the first element is used.
         *
         * @param target An HTMLElement in which the terminal will be mounted.
         */
        mount(target: HTMLElement | string): void;

        /**
         * Gracefully close the terminal instance.
         *
         * This detaches all event listeners, unmounts the terminal from the DOM,
         * and clears the backing functionality of the terminal.
         *
         * _The terminal should not be used again once disposed._
         *
         */
        dispose(): void;

        /**
         * Clear the entire terminal.
         *
         * This triggers the `clear` event.
         */
        clear(): void;

        /**
         * Write data to the terminal.
         *
         * Write operations can be chained or access the instance after a write
         *
         * @param data The data to write to the terminal.
         * @returns this reference to the terminal instance.
         */
        write(data: string): this;

        /**
         * Write data to the terminal, followed by a break line character (\n).
         *
         * Write operations can be chained or access the instance after a write
         *
         * @param data The data to write to the terminal.
         * @returns this reference to the terminal instance.
         */
        writeln(data: string): this;

        /**
         * Clears the entire history obtained on previous input.
         */
        clearHistory(): void;

        /**
         * Sets the autocomplete function that is invoked on Tab key.
         *
         * @param fn completer function that takes a string input and return a better
         * completion.
         */
        setCompleter(fn: (data: string) => string): void;

        /**
         * Suspends the currently dispatched event, and triggers the `close` event.
         *
         * This could be useful to notify the backing shell that the process needs to be
         * closed/terminated.
         */
        terminate(): void;

        /**
         * Activates the terminal to be ready for input.
         */
        prompt(): void;

        /**
         * Version number
         */
        version: string;
    }
}
