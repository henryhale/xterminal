import { isArray, isObject } from "../helpers";
import { IElementProps } from "./interface";

export const THEME = {
    CONTAINER: "xt",
    HIDDEN: "xt-hidden",
    INACTIVE: "xt-inactive",
    CURSOR: "xt-cursor",
    STDOUT: "xt-stdout",
    STDIN: "xt-stdin"
};

export function h<T extends HTMLElement>(
    tag: string,
    options?: IElementProps
): T {
    const elem = document.createElement(tag);
    if (typeof options !== "object" || options === null) {
        return elem as T;
    }
    if (options?.id) elem.id = options.id || "";
    if (options?.class) elem.className = options.class || "";
    if (options?.content) {
        elem.appendChild(document.createTextNode("" + options.content));
    }
    if (options?.html) elem.innerHTML = options.html;
    if (isArray(options?.children)) {
        options.children.forEach((c) => elem.append(c));
    }
    if (isObject(options?.props)) {
        Object.entries(options.props).forEach((v) =>
            elem.setAttribute(v[0], v[1])
        );
    }
    return elem as T;
}

export const SPACE = "&nbsp;";

export function initBuild() {
    const consoleBox = h<HTMLSpanElement>("span");
    const txtBefore = h<HTMLSpanElement>("span");
    const cursor = h<HTMLSpanElement>("span", {
        class: THEME.CURSOR,
        html: SPACE
    });
    const txtAfter = h<HTMLSpanElement>("span");
    const inputBox = h<HTMLInputElement>("input", {
        props: {
            autofocus: true,
            spellcheck: "false",
            autocomplete: "off"
        }
    });

    const term = h<HTMLDivElement>("div", {
        class: THEME.CONTAINER,
        props: { tabindex: 0 },
        children: [
            h<HTMLDivElement>("div", {
                class: THEME.STDOUT,
                children: [consoleBox, txtBefore, cursor, txtAfter]
            }),
            h<HTMLDivElement>("div", {
                class: THEME.STDIN,
                children: [inputBox]
            })
        ]
    });

    const fragment = document.createDocumentFragment();
    fragment.appendChild(term);

    return {
        mount(el: HTMLElement) {
            if (el instanceof HTMLElement) {
                el.innerHTML = "";
                el.appendChild(fragment);
            }
        },
        el: { txtAfter, txtBefore, cursor, inputBox, consoleBox, term }
    };
}

export function cancelEvent(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
}

export function parseOutput(data: string): string {
    return ("" + data)
        .replace(/(\n)|(\n\r)|(\r\n)/g, "<br/>")
        .replace(/\s{2}/g, SPACE.repeat(2))
        .replace(/\t/g, SPACE.repeat(4)); // Tab size -> 4 spaces
}

// TODO: compactibility check
export function getCursorPosition<T extends HTMLElement>(field: T): number {
    if ("selectionStart" in field) {
        return field.selectionStart as number;
    }
    return 0;
}
