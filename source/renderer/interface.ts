import type { IDisposable } from "../types";

/**
 * Render function - element props
 */
export interface IElementProps {
    id?: string;
    class?: string;
    content?: string;
    html?: string;
    children?: (string | Node)[];
    props?: object;
}

/**
 * Key Bindings to the Input
 */
interface IKeyBindingAction {
    (arg1: unknown, arg2?: unknown): void;
}

export interface IKeyBindings {
    [key: string]: IKeyBindingAction;
}

/**
 * Renderer
 */
export interface IRenderer extends IDisposable {
    canInput: boolean;
    setKeyBindings(options: IKeyBindings): void;
    mount(el: HTMLElement): void;
    focusInput(): void;
    blurInput(): void;
    clearConsole(): void;
    output(data: string): void;
}
