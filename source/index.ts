import XEventEmitter from "./emitter/index";
import { isFunction } from "./helpers";
import type { ITerminalOptions } from "./types";
import type { ITerminalState } from "./interface";
import { CLEAR_EVENT, PAUSE_EVENT, RESUME_EVENT, setup } from "./instance";
import {
    TARGET_INVALID_ERR,
    TARGET_NOT_CONNECTED_ERR,
    XError
} from "./base/error";
import { escapeHTML } from "./output/index";
import { NEWLINE } from "./renderer/dom";

export default class XTerminal extends XEventEmitter {
    #state!: ITerminalState;

    public isMounted: boolean;

    constructor(options?: ITerminalOptions) {
        super();
        this.isMounted = false;
        if (options && options?.target) {
            this.mount(options.target);
        }
    }

    public focus(): void {
        this.#state.input.focus();
    }

    public blur(): void {
        this.#state.input.blur();
    }

    public pause(): void {
        this.#state.input.pause();
        this.emit(PAUSE_EVENT);
    }

    public resume(): void {
        this.#state.input.resume();
        this.emit(RESUME_EVENT);
    }

    public setInput(value: string): void {
        this.#state.input.setValue(value);
    }

    public clearInput(): void {
        this.#state.input.clear();
    }

    public write(data: string | number, callback?: () => void): void {
        this.#state.output.write("" + data, callback);
    }

    public writeln(data: string | number, callback?: () => void): void {
        this.#state.output.write("" + data + NEWLINE, callback);
    }

    public writeSafe(data: string | number, callback?: () => void): void {
        this.#state.output.writeSafe("" + data, callback);
    }

    public writelnSafe(data: string | number, callback?: () => void): void {
        this.#state.output.writeSafe("" + data + NEWLINE, callback);
    }

    public clear(): void {
        this.#state.output.clear();
        this.emit(CLEAR_EVENT);
    }

    public clearLast(): void {
        this.#state.output.clearLast();
    }

    public get history(): string[] {
        return this.#state.history.list || [];
    }

    public set history(newState: string[]) {
        newState.forEach((item) => this.#state.history.add(item));
    }

    public clearHistory(): void {
        this.#state.history.clear();
    }

    public setCompleter(fn: (data: string) => string): void {
        if (!isFunction(fn)) return;
        this.#state.completer = fn;
    }

    public mount(target: HTMLElement | string): void {
        if (this.isMounted) return;

        if (target && typeof target === "string") {
            target = document.querySelector<HTMLElement>(target) as HTMLElement;
        }

        if (!(target instanceof HTMLElement)) {
            throw new XError(TARGET_INVALID_ERR);
        }

        if (!target.isConnected && console) {
            console.warn(TARGET_NOT_CONNECTED_ERR);
        }

        target.innerHTML = "";

        this.#state = setup(this, target);

        this.isMounted = true;
    }

    public dispose(): void {
        super.dispose();
        const state = this.#state;
        state.history.clear();
        state.completer = undefined;
        state.input.dispose();
        const box = state.output.el.parentNode;
        box?.parentNode?.removeChild(box);
        this.isMounted = false;
    }

    static get version() {
        return "__VERSION__";
    }

    static get XEventEmitter() {
        return XEventEmitter;
    }

    static escapeHTML(data?: string): string {
        return escapeHTML(data);
    }
}
