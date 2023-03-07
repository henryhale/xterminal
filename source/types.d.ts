/**
 * Disposable object
 */
export interface IDisposable {
    dispose(): void;
}

/**
 * Effect - callback triggered when a reactive value changes
 */
export interface IEffect {
    (): void;
}

/**
 * Reactive value -> all effects are disposable
 */
export interface IReactive<T> extends IDisposable {
    value: T;
}

/**
 * Render function - element props
 */
interface IElementProps {
    id?: string,
    class?: string,
    content?: string,
    html?: string,
    children?: (string | Node)[],
    props?: object
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
 * History
 */
export interface IHistory {
    next: string;
    previous: string;
    list: string[];
    size: number;
    add(input: string): boolean;
    clear(): void;
}

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

export interface IEventEmitter extends IDisposable {
    isEmitting: boolean;
    on: IAddEventListener<this>;
    once: IAddEventListener<this>;
    off: IAddEventListener<this>;
    emit(ev: IEventName, arg1?: unknown, arg2?: unknown): this;
    stopEmit(): void;
}

/**
 * Terminal
 */
export interface IBlock {
    history: IHistory;
    renderer: IRenderer;
    isActive: boolean;
    completer: ((data: string) => string) | null;
}

export interface ITerminalApi extends IEventEmitter {
    blur(): void;
    focus(): void;
    mount(target: HTMLElement | string): void;
    dispose(): void;
    clear(): void;
    write(data: string): this;
    writeln(data: string): this;
    clearHistory(): void;
    setCompleter(fn: (data: string) => string): void;
    terminate(): void;
    prompt(): void;
}
