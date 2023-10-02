import XTerminal from "./index";
import XHistory from "./history/index";
import XOutputComponent from "./output/index";
import XInputComponent from "./input/index";
import { createEffect } from "./base/reactivity";
import { THEME, h, scrollDown } from "./renderer/dom";
import { isFunction, isMobile } from "./helpers";
import {
    ARROW_DOWN_KEY,
    ARROW_UP_KEY,
    ENTER_KEY,
    TAB_KEY,
    addEvent
} from "./renderer/events";
import { bounce } from "./base/debouncer";
import { ITerminalState } from "./interface";

/**
 * Public Events
 */
export const DATA_EVENT = "data";
export const CLEAR_EVENT = "clear";
export const KEYPRESS_EVENT = "keypress";
export const PAUSE_EVENT = "pause";
export const RESUME_EVENT = "resume";

/**
 * Composes the components of the terminal object and integrates them
 * @param instance The terminal object
 * @param target The DOM element in which the terminal is to be mounted
 */
export function setup(
    instance: XTerminal,
    target: HTMLElement
): ITerminalState {
    const term = h<HTMLDivElement>("div", {
        class: THEME.CONTAINER,
        props: { tabindex: 0 }
    });

    const xhistory = new XHistory();
    const output = new XOutputComponent(term);
    const input = new XInputComponent(term);

    const state = {
        input,
        output,
        history: xhistory,
        completer: (x: string) => x
    };

    // connect the input to output (cursor & input text)
    input.pipe(output);

    // scroll to the bottom on every output operation
    output.onoutput = () => scrollDown(term);

    instance.register(
        addEvent(term, "keydown", function (ev: KeyboardEvent) {
            // focus input element
            input.focus();
            // redirect the `keyboard` event to the input in the next event loop
            bounce(() => {
                input.el.dispatchEvent(new KeyboardEvent("keydown", ev));
                input.el.dispatchEvent(new KeyboardEvent("input", ev));
            });
        })
    );

    instance.register(
        addEvent(term, "focus", () => (input.isFocused.value = true))
    );

    instance.register(
        addEvent(term, "blur", () => (input.isFocused.value = false))
    );

    if (isMobile()) {
        // Toggle keyboard on mobile devices (touchscreen) on tap
        instance.register(addEvent(term, "click", input.focus.bind(input)));
    }

    target.appendChild(term);

    // handle keydown event
    input.onkeypress = (ev) => {
        if (ev.key == ENTER_KEY) {
            ev.cancel();
            xhistory.add(ev.value);
            instance.emit(DATA_EVENT, ev.value);
        } else if (ev.key == TAB_KEY) {
            ev.cancel();
            if (isFunction(state.completer)) {
                input.setValue(state.completer(ev.value));
            }
        } else if (ev.key == ARROW_DOWN_KEY) {
            ev.cancel();
            input.setValue(xhistory.next);
        } else if (ev.key == ARROW_UP_KEY) {
            ev.cancel();
            input.setValue(xhistory.previous);
        } else {
            instance.emit(KEYPRESS_EVENT, ev);
        }
        scrollDown(term);
    };

    createEffect(() => {
        // Fill the cursor if focused, otherwise outline
        if (input.isFocused.value) {
            term.classList.remove(THEME.INACTIVE);
        } else {
            term.classList.add(THEME.INACTIVE);
        }
    });

    return state;
}
