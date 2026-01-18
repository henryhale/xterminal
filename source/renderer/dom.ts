import { isArray, isObject } from "../helpers";
import type { IElementProps } from "./interface";

export const NEWLINE = "\n";

export const SPACE = "&nbsp;";

/**
 * CSS class names
 */
export const THEME = {
    CONTAINER: "xt",
    INACTIVE: "xt-inactive",
    CURSOR: "xt-cursor",
    OUTPUT: "xt-stdout",
    INPUT: "xt-stdin"
};

export function scrollDown(el: HTMLElement): void {
    if (el) el.scrollTo(0, el.scrollHeight);
}

/**
 * Create a ready to use HTMLElement
 *
 * https://github.com/henryhale/render-functions
 *
 * https://vuejs.org/guide/extras/render-function.html
 *
 * @param tag The HTML element tag
 * @param options The some properties of the element
 * @returns The HTML Element
 */
export function h<T extends HTMLElement>(
    tag: string,
    options?: IElementProps
): T {
    const elem = document.createElement(tag);
    if (!isObject(options)) {
        return elem as T;
    }
    if (options?.id) {
        elem.id = options.id || "";
    }
    if (options?.class) {
        elem.className = options.class || "";
    }
    if (options?.content) {
        elem.appendChild(document.createTextNode(options.content || ""));
    }
    if (options?.html) {
        elem.innerHTML = options.html;
    }
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
