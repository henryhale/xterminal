import { IInputInterface } from "./input/interface";
import { IOutputInterface } from "./output/interface";
import { IHistory } from "./history/interface";
import { IEventEmitter } from "./emitter/interface";

/**
 * Terminal State
 */
export type ITerminalState = {
    /**
     * Input component for the terminal
     */
    input: IInputInterface;

    /**
     * Output component for the terminal
     */
    output: IOutputInterface;

    /**
     * History: store of inputs
     */
    history: IHistory;

    /**
     * Autocomplete function invoked on TAB key
     */
    completer?: (data: string) => string;
};

/**
 * Terminal Options
 */
export type ITerminalOptions = {
    target?: HTMLElement;
};

/**
 * Interface: Terminal API
 */
export interface ITerminalAPI extends IEventEmitter {
    /**
     * Indicates whether the terminal is mounted to DOM or not
     */
    isMounted: boolean;

    /**
     * Opens the terminal instance in the specified target HTML element
     */
    mount(target: HTMLElement | string): void;

    /**
     * Input Component: public methods
     */
    blur(): void;
    focus(): void;
    pause(): void;
    resume(): void;

    /**
     * Output Component: public methods
     */
    clear(): void;
    clearLast(): void;
    write(data: string | number, callback?: () => void): void;
    writeln(data: string | number, callback?: () => void): void;

    /**
     * Access the history stack
     */
    history: string[];

    /**
     * Clear the history stack
     */
    clearHistory(): void;

    /**
     * Set the autocomplete function to be invoked on TAB key
     */
    setCompleter(fn: (data: string) => string): void;
}
