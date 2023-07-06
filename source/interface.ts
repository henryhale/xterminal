import { IHistory } from "./history/interface";
import { IRenderer } from "./renderer/interface";
import { IEventEmitter } from "./emitter/interface";

/**
 * Terminal State
 */
export interface IBlock {
    history: IHistory;
    renderer: IRenderer;
    isActive: boolean;
    completer: ((data: string) => string) | null;
}

/**
 * Terminal API
 */
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
