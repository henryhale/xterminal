import { XError } from "./base/Error";
import XEventEmitter from "./emitter/index";
import { isFunction } from "./helpers";
import XHistory from "./history/index";
import XRenderer from "./renderer/index";
import { IBlock, ITerminalApi } from "./types";

// Public events
const DATA_EVENT = 'data';      /* Enter key */
const CLOSE_EVENT = 'close';    /* CTRL + C */
const CLEAR_EVENT = 'clear';    /* CTRL + L */
const HISTORY_CHANGE_EVENT = 'history';

// Private events
const HISTORY_NEXT_EVENT = Symbol('next history item');         /* Arrow Down */
const HISTORY_PREVIOUS_EVENT = Symbol('previous history item'); /* Arrow Up */
const AUTOCOMPLETE_EVENT = Symbol('auto complete');             /* Tab key */

// some privacy
const instances = new WeakMap<Terminal, IBlock>();

function $(instance: Terminal): IBlock {
    if (instance.isDisposed) return {} as IBlock;
    return instances.get(instance) || {} as IBlock;
}

export default class Terminal extends XEventEmitter implements ITerminalApi {

    constructor() {
        super();
        
        instances.set(this, {
            history: new XHistory(),
            renderer: new XRenderer(),
            completer: null,
            isActive: false,
        });

        $(this).renderer.setKeyBindings({
            arrowup: fn => $(this).isActive && this.emit(HISTORY_PREVIOUS_EVENT, fn),
            arrowdown: fn => $(this).isActive && this.emit(HISTORY_NEXT_EVENT, fn),
            tab: (fn, data) => $(this).isActive && this.emit(AUTOCOMPLETE_EVENT, fn, data),
            enter: (data) => $(this).isActive && this.emit(DATA_EVENT, data),
            l: () => $(this).isActive && this.clear(),
            c: () => this.terminate(),
        });

        this.on(HISTORY_NEXT_EVENT, fn => fn.call(undefined, $(this).history?.next));

        this.on(HISTORY_PREVIOUS_EVENT, fn => fn.call(undefined, $(this).history?.previous));

        this.on(AUTOCOMPLETE_EVENT, (fn, data) => {
            let result;
            const c = $(this).completer;
            if (isFunction(c)) {
                try {
                    result = c.call(undefined, data);
                } catch (error) {
                    throw new Error('[x] completer: '+error);
                }
            }
            return fn.call(undefined, result || data);
        });

        this.on(DATA_EVENT, (data: string) => {
            $(this).isActive = false;
            if ($(this).history?.add(data)) {
                this.emit(HISTORY_CHANGE_EVENT, $(this).history?.list);
            }
            if ($(this).renderer) $(this).renderer.canInput = false;
        });
    }

    public blur(): void {
        $(this).renderer?.blurInput();
    }

    public focus(): void {
        $(this).renderer?.focusInput();
    }

    public mount(target: HTMLElement | string): void {
        if (target && typeof target === 'string') {
            target = document.querySelector<HTMLElement>(target) as HTMLElement;
        }
        if (!(target instanceof HTMLElement)) {
            throw new XError('mount: A parent HTMLElement is required');
        }
        if (!target.isConnected) {
            console.warn("[-] mount: 'mount' was called on an HTMLElement that is not attached to DOM.");
        }
        $(this).renderer?.mount(target);
    }

    public dispose(): void {
        if (this.isDisposed) return;
        $(this).renderer?.dispose();
        $(this).history?.clear();
        super.dispose();
        instances.delete(this);
    }
    
    public clear(): void {
        $(this).renderer?.clearConsole();
        this.emit(CLEAR_EVENT);
    }
    
    public write(data: string): this {
        $(this).renderer?.output(data);
        return this;
    }

    public writeln(data: string): this {
        return this.write(data).write('\n');
    }

    public clearHistory() {
        $(this).history?.clear();
    }

    public setCompleter(fn: (data: string) => string): void {
        if (isFunction(fn)) {
            $(this).completer = fn;
        } else {
            throw new XError('setCompleter: expects a function (that returns a string) as an argument, got '+(typeof fn));
        }
    }

    public terminate(): void {
        this.stopEmit();
        this.emit(CLOSE_EVENT);
    }

    public prompt(): void {
        const $x = $(this);
        $x.isActive = true;
        if ($x.renderer) $x.renderer.canInput = true;
    }

    static get version() {
        return '__VERSION__';
    }

}
