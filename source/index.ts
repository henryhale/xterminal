import XEventEmitter from "./emitter/index";
import { isFunction } from "./helpers";
import { ITerminalAPI, ITerminalOptions } from "./interface";
import { getState as $, CLEAR_EVENT, deleteState, setup } from "./instance";
import {
    TARGET_INVALID_ERR,
    TARGET_NOT_CONNECTED_ERR,
    XError
} from "./base/error";

export default class XTerminal extends XEventEmitter implements ITerminalAPI {
    public isMounted: boolean;

    constructor(options: ITerminalOptions) {
        super();
        this.isMounted = false;
        if (options?.target) {
            this.mount(options.target);
        }
    }

    public focus(): void {
        $(this).state?.input.focus();
    }

    public blur(): void {
        $(this).state?.input.blur();
    }

    public pause(): void {
        $(this).state?.input.pause();
    }

    public resume(): void {
        $(this).state?.input.resume();
    }

    public write(data: string | number, callback?: () => void): void {
        $(this).state?.output.write("" + data, callback);
    }

    public writeln(data: string | number, callback?: () => void): void {
        $(this).state?.output.write("" + data + "\n", callback);
    }

    public clear(): void {
        $(this).state?.output.clear();
        this.emit(CLEAR_EVENT);
    }

    public clearLast(): void {
        $(this).state?.output.clearLast();
    }

    public get history(): string[] {
        return $(this).state?.history.list || [];
    }

    public clearHistory(): void {
        $(this).state?.history.clear();
    }

    public setCompleter(fn: (data: string) => string): void {
        if (!isFunction(fn)) return;
        $(this).process((state) => (state.completer = fn));
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

        setup(this, target);

        this.isMounted = true;
    }

    public dispose(): void {
        super.dispose();
        $(this).process((state) => {
            state.history.clear();
            state.completer = undefined;
            state.input.dispose();
            const box = state.output.el.parentNode;
            box?.parentNode?.removeChild(box);
        });
        deleteState(this);
    }

    static get version() {
        return "__VERSION__";
    }
}
