import Disposable from "../base/disposable";
import { IReactive } from "../base/types";
import { isFunction } from "../helpers";
import { inputBuild } from "../renderer/index";
import { SPACE, THEME, h } from "../renderer/dom";
import { ENTER_KEY, addEvent } from "../renderer/events";
import { updateCursor } from "./cursor";
import { debounce } from "../base/debouncer";
import { createEffect, ref } from "../base/reactivity";
import { IOutputInterface } from "../output/interface";
import { IInputInterface, IKeyPress } from "./interface";

/**
 * Input Component
 */
export default class XInputComponent
    extends Disposable
    implements IInputInterface
{
    private el: HTMLInputElement;
    private data: IReactive<string>;
    private ptr: IReactive<number>;
    private isActive: IReactive<boolean>;
    public showInput: IReactive<boolean>;
    public isFocused: IReactive<boolean>;
    public onkeypress?: ((ev: IKeyPress) => void) | undefined;

    constructor(target: HTMLElement) {
        super();

        this.el = inputBuild(target);
        this.data = ref<string>("");
        this.ptr = ref<number>(0);
        this.isActive = ref<boolean>(true);
        this.showInput = ref<boolean>(true);
        this.isFocused = ref<boolean>(false);

        // All reactive values are disposable
        this.register(this.data);
        this.register(this.ptr);
        this.register(this.isActive);
        this.register(this.showInput);
        this.register(this.isFocused);

        const cursorUpdater = () => updateCursor(this.el, this.data, this.ptr);

        const cursorHandler = debounce(cursorUpdater);

        const inputHandler = debounce(() => {
            this.data.value = this.el.value;
        });

        createEffect(cursorUpdater);

        this.register(
            addEvent(this.el, "blur", () => (this.isFocused.value = false))
        );

        this.register(
            addEvent(
                this.el,
                "focus",
                () => (this.isFocused.value = true),
                false
            )
        );

        this.register(
            addEvent(
                this.el,
                "keyup",
                () => this.isActive.value && cursorHandler(),
                false
            )
        );

        this.register(
            addEvent(this.el, "input", () => {
                inputHandler();
                cursorHandler();
            })
        );

        this.register(
            addEvent(this.el, "keydown", (ev: KeyboardEvent) => {
                const value = this.data.value;
                if (ev.key === ENTER_KEY) {
                    if (this.el) this.el.value = "";
                    this.data.value = "";
                    this.showInput.value = true;
                }
                if (!this.isActive.value) return;
                if (!isFunction(this.onkeypress)) return;
                this.onkeypress({
                    key: ev.key,
                    altKey: ev.altKey,
                    ctrlKey: ev.ctrlKey,
                    metaKey: ev.metaKey,
                    shiftKey: ev.shiftKey,
                    value,
                    cancel() {
                        ev.preventDefault();
                        ev.stopPropagation();
                    }
                });
                cursorHandler();
            })
        );
    }

    public blur(): void {
        if (this.el) this.el.blur();
    }

    public focus(): void {
        if (this.el) this.el.focus();
    }

    public pause(): void {
        this.isActive.value = false;
    }

    public resume(): void {
        this.isActive.value = true;
    }

    public setValue(str: string): void {
        if (this.el) this.el.value = str;
        this.data.value = str;
    }

    public pipe(output: IOutputInterface): void {
        const txtBefore = h<HTMLSpanElement>("span");
        const cursor = h<HTMLSpanElement>("span", {
            class: THEME.CURSOR,
            html: SPACE
        });
        const txtAfter = h<HTMLSpanElement>("span");

        output.el?.append(txtBefore, cursor, txtAfter);

        createEffect(() => {
            const i = this.ptr.value;
            const d = this.data.value;
            if (!this.isActive.value || !this.showInput.value) {
                txtBefore.innerHTML = "";
                cursor.innerHTML = SPACE;
                txtAfter.innerHTML = "";
                return;
            }
            txtBefore.innerHTML = d
                .substring(0, i)
                .replace(/\s{2}/g, " " + SPACE);
            cursor.innerHTML = d.substring(i, i + 1).trim() || SPACE;
            txtAfter.innerHTML = d
                .substring(i + 1)
                .replace(/\s{2}/g, " " + SPACE);
        });
    }
}
