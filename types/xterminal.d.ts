/**
 * @author Henry Hale
 * @license MIT
 *
 * This contains the type declarations for the `xterminal` library. Note that
 * some interfaces differ between this file and the actual implementation in
 * source/, that's because this file declares the *Public* API which is intended
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
    export type IEventName = "data" | "clear" | "keypress" | string | symbol;

    /**
     * Callback function invoked when the event is dispatched.
     */
    export interface IEventListener {
        (...args: unknown[]): void;
    }

    /**
     * Adds a `listener` (callback function) to be invoked when the event `ev` is dispatched.
     */
    export type IEventHandler = (
        event: IEventName,
        listener: IEventListener
    ) => void;

    /**
     * Event emitter
     *
     * It extends the Disposable class.
     */
    export class IEventEmitter extends IDisposable {
        /**
         * Appends a event listener to the specified event.
         *
         * The listener is invoked everytime the event is dispatched.
         *
         * - return disposable object to remove the event listener
         */
        on: IEventHandler;

        /**
         * Appends a event listener to the specified event.
         *
         * The listener is invoked _only once_ when the event is dispatched.
         *
         * _It is deleted thereafter._
         */
        once: IEventHandler;

        /**
         * Removes an event listener from the specified event.
         *
         * The listener won't be invoked on event dispatch thereafter.
         */
        off: IEventHandler;

        /**
         * Triggers an event
         * @param event The event name to dispatch.
         * @param args data to be passed to the event listener.
         */
        emit(event: IEventName, ...args: unknown[]): void;
    }

    /**
     * Terminal Class
     */
    export default class Terminal extends IEventEmitter {
        /**
         * Mounts the terminal instance in the `target` HTMLElement.
         *
         * If the selector is given, the first element is used.
         *
         * @param target An HTMLElement in which the terminal will be mounted.
         */
        mount(target: HTMLElement | string): void;

        /**
         * Focus the terminal - ready for input.
         */
        focus(): void;

        /**
         * Blurs the terminal.
         */
        blur(): void;

        /**
         * Write data to the terminal.
         *
         * @param data The data to write to the terminal
         * @param callback Optional function invoked on successful write
         * @returns void
         */
        write(data: string | number, callback?: () => void): void;

        /**
         * Write data to the terminal, followed by a break line character (\n).
         *
         * @param data The data to write to the terminal
         * @param callback Optional function invoked on successful write
         * @returns void
         */
        writeln(data: string | number, callback?: () => void): void;

        /**
         * Clear the entire terminal.
         *
         * This method triggers the `clear` event.
         */
        clear(): void;

        /**
         * Remove the element containing the previous output
         */
        clearLast(): void;

        /**
         * Access the history stack
         */
        history: string[];

        /**
         * Clears the entire history stack.
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
         * Deactivate the terminal input
         */
        pause(): void;

        /**
         * Activate the terminal input
         */
        resume(): void;

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
         * Version number
         */
        version: string;
    }
}
