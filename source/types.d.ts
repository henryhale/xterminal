/**
 * @author Henry Hale <https://github.com/henryhale>
 * @license MIT
 *
 * This contains the type declarations for the `xterminal` library. Note that
 * some interfaces differ between this file and the actual implementation in
 * source/, that's because this file declares the *Public* API which is intended
 * to be stable and consumed by external programs.
 */

/// <reference lib="dom"/>

/**
 * An object that can be disposed via a dispose function.
 */
export declare class IDisposable {
    /**
     * Clean up
     */
    dispose(): void;
}

/**
 * Type of event name.
 */
export type IEventName = string | symbol;

/**
 * Callback function invoked when the event is dispatched.
 */
export type IEventListener = (...args: unknown[]) => void;

/**
 * Event map
 */
interface IEventMap {
    clear: () => void;
    data: (input: string) => void;
    keypress: (ev: IKeyPress) => void;
    pause: () => void;
    resume: () => void;
}

/**
 * Object passed to callback functions invoked on `keypress` event
 */
export type IKeyPress = {
    key: string;
    value: string;
    altKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
    cancel(): void;
};

/**
 * Event emitter
 *
 * It extends the Disposable class.
 */
export declare class XEventEmitter extends IDisposable {
    /**
     * Appends a event listener to the specified event.
     *
     * The listener is invoked everytime the event is dispatched.
     *
     * - return disposable object to remove the event listener
     */
    on<K extends keyof IEventMap>(event: K, listener: IEventMap[K]): void;
    on(event: IEventName, listener: IEventListener): void;

    /**
     * Appends a event listener to the specified event.
     *
     * The listener is invoked _only once_ when the event is dispatched.
     *
     * _It is deleted thereafter._
     */
    once<K extends keyof IEventMap>(event: K, listener: IEventMap[K]): void;
    once(event: IEventName, listener: IEventListener): void;

    /**
     * Removes an event listener from the specified event.
     *
     * The listener won't be invoked on event dispatch thereafter.
     */
    off<K extends keyof IEventMap>(event: K, listener: IEventMap[K]): void;
    off(event: IEventName, listener: IEventListener): void;

    /**
     * Triggers an event
     * @param event The event name to dispatch.
     * @param args data to be passed to the event listener.
     */
    emit<K extends keyof IEventMap>(event: K, ...args: unknown[]): void;
    emit(event: IEventName, ...args: unknown[]): void;
}

/**
 * Terminal Options
 */
export type ITerminalOptions = {
    /**
     * An HTMLElement in which the terminal will be mounted
     */
    target?: HTMLElement;
};

/**
 * Plugin
 */
// export interface IPlugin {
//     install(context: IPluginContext): void;
// }

/**
 * XTerminal
 *
 * Create a new terminal instance
 */
declare class XTerminal extends XEventEmitter {
    constructor(options?: ITerminalOptions);

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
     * - use `XTerminal.writeSafe` when printing arbitrary data like user input
     *
     * @param data The data to write to the terminal
     * @param callback Optional function invoked on successful write
     * @returns void
     */
    write(data: string | number, callback?: () => void): void;

    /**
     * Safely write data to the terminal.
     *
     * (recommended) to prevent malicious attacks like XSS
     *
     * Example:
     * ```js
     * term.writeSafe('<h1>hello</h1>');
     * // &lt;h1&gt;hello&lt;/h1&gt;
     * ```
     *
     * @param data The data to write to the terminal
     * @param callback Optional function invoked on successful write
     * @returns void
     */
    writeSafe(data: string | number, callback?: () => void): void;

    /**
     * Write data to the terminal, followed by a break line character (\n).
     *
     * - use `XTerminal.writelnSafe` when printing arbitrary data like user input
     *
     * @param data The data to write to the terminal
     * @param callback Optional function invoked on successful write
     * @returns void
     */
    writeln(data: string | number, callback?: () => void): void;

    /**
     * Safely write data to the terminal, followed by a break line character (\n).
     *
     * (recommended) to prevent malicious attacks like XSS
     *
     * Example:
     * ```js
     * term.writelnSafe('<h1>hello</h1>');
     * // &lt;h1&gt;hello&lt;/h1&gt;<br/>
     * ```
     * @param data The data to write to the terminal
     * @param callback Optional function invoked on successful write
     * @returns void
     */
    writelnSafe(data: string | number, callback?: () => void): void;

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
     * Install an addon/plugin
     */
    // use(plugin: IPlugin): void;

    /**
     * Version number
     */
    static readonly version: string;
}

export default XTerminal;
