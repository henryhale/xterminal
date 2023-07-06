import Disposable from "../base/Disposable";
import { IReactive } from "../base/types";
import { IRenderer, IKeyBindings } from "./interface";
import { createEffect, ref } from "../base/Reactivity";
import {
    cancelEvent,
    getCursorPosition,
    h,
    initBuild,
    parseOutput,
    SPACE,
    THEME
} from "./dom";
import { bounce, debouncer } from "../base/Debouncer";
import { isFunction, isObject } from "../helpers";
import {
    ARROW_DOWN_KEY,
    ARROW_UP_KEY,
    ENTER_KEY,
    TAB_KEY,
    getEventKeyNames
} from "./keys";

export default class XRenderer extends Disposable implements IRenderer {
    private _data: IReactive<string>;
    private _isActive: IReactive<boolean>;
    private _ptr: IReactive<number>;
    private _canInput: IReactive<boolean>;

    private _el;

    private _bindings: IKeyBindings;

    public readonly mount;

    constructor() {
        super();

        this._data = ref<string>("");
        this._isActive = ref<boolean>(false);
        this._ptr = ref<number>(0);
        this._canInput = ref(false);

        this.register(this._data);
        this.register(this._isActive);
        this.register(this._ptr);
        this.register(this._canInput);

        const { el, mount } = initBuild();

        this._el = el;
        this._bindings = {};
        this._initEvents();
        this._initEffects();

        this.mount = mount;
    }

    private _on(
        el: Element | Document,
        type: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: (e: any) => void,
        opt?: boolean
    ) {
        el.addEventListener(type, handler, opt);
        let disposed = false;
        return {
            dispose() {
                if (disposed) return;
                el.removeEventListener(type, handler, opt);
                disposed = true;
            }
        };
    }

    private _initEvents() {
        let buffer = "";
        const inputHandler = debouncer();
        const cursorHandler = debouncer();

        const setCursorPosition = () => {
            let pos = getCursorPosition<HTMLInputElement>(this._el.inputBox);
            if (pos > this._data.value.length) {
                pos = this._data.value.length;
            } else if (pos < 0) {
                pos = 0;
            }
            this._ptr.value = pos;
            this._scrollDown();
        };

        const setInputValue = (val = "", dir?: number) => {
            if (dir === 1 && !val) {
                return;
            } else if (dir === 2 && !val && buffer) {
                val = buffer;
            }
            val = val || "";
            if (this._el.inputBox) this._el.inputBox.value = val;
            this._data.value = val;
            this._ptr.value = val.length;
        };

        this.register(
            this._on(this._el.term, "focus", () => this.focusInput())
        );

        this.register(
            this._on(
                this._el.inputBox,
                "focus",
                () => (this._isActive.value = true)
            )
        );

        this.register(
            this._on(
                this._el.inputBox,
                "blur",
                () => (this._isActive.value = false)
            )
        );

        this.register(
            this._on(this._el.inputBox, "input", () => {
                inputHandler(() => {
                    this._data.value = buffer = this._el.inputBox.value;
                });
                cursorHandler(setCursorPosition);
            })
        );

        this.register(
            this._on(this._el.inputBox, "keyup", () =>
                cursorHandler(setCursorPosition)
            )
        );

        this.register(
            this._on(this._el.inputBox, "keydown", (e: KeyboardEvent) => {
                const keynames = getEventKeyNames(e);
                if (keynames.includes(ENTER_KEY)) buffer = "";
                let key = "";
                if (keynames.some((v) => (key = v) in this._bindings)) {
                    const isNormalKey = "cl".includes(key);
                    if (!isNormalKey || (isNormalKey && e?.ctrlKey)) {
                        cancelEvent(e);
                    }
                    if (key === ENTER_KEY) {
                        bounce(this._bindings[key], this._data.value);
                        bounce(setInputValue, buffer);
                    } else if (key === ARROW_UP_KEY) {
                        bounce(this._bindings[key], (val: string) =>
                            setInputValue(val, 1)
                        );
                    } else if (key === ARROW_DOWN_KEY) {
                        bounce(this._bindings[key], (val: string) =>
                            setInputValue(val, 2)
                        );
                    } else if (key === TAB_KEY) {
                        bounce(
                            this._bindings[key],
                            (val: string) => val && setInputValue(val),
                            this._data.value || buffer || ""
                        );
                    } else if (e?.ctrlKey && isNormalKey) {
                        cancelEvent(e);
                        bounce(this._bindings[key]);
                    }
                }
                cursorHandler(setCursorPosition);
            })
        );
    }

    private _initEffects() {
        createEffect(() => {
            const active = this._isActive.value;
            const hasClass = this._el.term.classList.contains(THEME.INACTIVE);
            if (active && hasClass) {
                this._el.term.classList.remove(THEME.INACTIVE);
            }
            if (!active && !hasClass) {
                this._el.term.classList.add(THEME.INACTIVE);
            }
        });

        createEffect(() => {
            const i = this._ptr.value,
                d = this._data.value;
            if (!this._canInput.value) {
                this._el.cursor.innerHTML = SPACE;
                return;
            }
            const a = d.substring(0, i);
            const b = d.substring(i, i + 1);
            const c = d.substring(i + 1);
            this._el.txtBefore.innerHTML = a.replace(/\s{2}/g, " " + SPACE);
            this._el.cursor.innerHTML = !b || b === " " ? SPACE : b;
            this._el.txtAfter.innerHTML = c.replace(/\s{2}/g, " " + SPACE);
        });

        createEffect(() => {
            if (this._canInput.value) {
                this._el.txtAfter.classList.remove(THEME.HIDDEN);
                this._el.txtBefore.classList.remove(THEME.HIDDEN);
            } else {
                this._el.txtAfter.classList.add(THEME.HIDDEN);
                this._el.txtBefore.classList.add(THEME.HIDDEN);
            }
        });
    }

    private _scrollDown() {
        if (this._el.term) {
            this._el.term.scrollTo(0, this._el.term.scrollHeight);
        }
    }

    public setKeyBindings(options: IKeyBindings): void {
        if (!isObject(options)) return;
        for (const key in options) {
            if (
                Object.hasOwnProperty.call(options, key) &&
                isFunction(options[key])
            ) {
                this._bindings[key] = options[key];
            }
        }
    }

    public focusInput(): void {
        if (this._el.inputBox) {
            this._el.inputBox.focus({ preventScroll: true });
        }
    }

    public blurInput(): void {
        if (this._el.inputBox) {
            this._el.inputBox.blur();
        }
    }

    public clearConsole(): void {
        if (this._el.consoleBox) {
            this._el.consoleBox.innerHTML = "";
        }
    }

    public set canInput(flag: boolean) {
        this._canInput.value = flag;
    }

    public output(data: string): void {
        if (!data || !this._el.consoleBox) return;
        this._el.consoleBox.appendChild(h("span", { html: parseOutput(data) }));
        this._scrollDown();
    }

    public dispose(): void {
        if (this.isDisposed) return;
        this._el.term.classList.remove(THEME.CONTAINER);
        super.dispose();
        this._bindings = {};
        this._el.term.parentNode?.removeChild(this._el.term);
    }
}
