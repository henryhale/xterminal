import { IDisposable } from "../base/types";
import { IOutputInterface } from "../output/interface";

/**
 * Object passed to callback functions invoked on `keypress` event
 */
export type IKeyPress = {
    key: string;
    altKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
    ctrlKey: boolean;
    value: string;
    cancel(): void;
};

/**
 * Interface: Input Component
 */
export interface IInputInterface extends IDisposable {
    /**
     * Blur the input element
     */
    blur(): void;

    /**
     * Focus the input element
     */
    focus(): void;

    /**
     * Deactivate the component
     */
    pause(): void;

    /**
     * Activate the component
     */
    resume(): void;

    /**
     * Callback function invoked on every key press
     */
    onkeypress?: (ev: IKeyPress) => void;

    /**
     * Bridge the input to the output component: cursor & input
     */
    pipe(output: IOutputInterface): void;

    /**
     * Set the value of the input element, updates the cursor
     */
    setValue(str: string): void;
}
