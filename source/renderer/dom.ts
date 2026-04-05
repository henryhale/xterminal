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
 * ⚠️ SECURITY: XSS Prevention
 * - If `options.html` is provided WITHOUT `isSafe: true`, it will be set as textContent (safe)
 * - If `options.html` is provided WITH `isSafe: true`, it will be set as innerHTML (unsafe)
 * - Only use `isSafe: true` with trusted, internal HTML content (e.g., formatting constants)
 * - Never use `isSafe: true` with user input, API data, or external sources
 *
 * https://github.com/henryhale/render-functions
 *
 * https://vuejs.org/guide/extras/render-function.html
 *
 * @param tag The HTML element tag
 * @param options The properties of the element
 * @param options.id Element ID attribute
 * @param options.class CSS class names
 * @param options.content Safe text content (uses textContent)
 * @param options.html HTML string - MUST set isSafe: true to use innerHTML, otherwise treated as text
 * @param options.isSafe Whether the html property contains safe/trusted content. Defaults to false
 * @param options.children Child nodes to append
 * @param options.props Additional HTML attributes to set
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
    if (options?.html && options?.isSafe) {
        // innerHTML is only set if explicitly marked as safe to prevent XSS attacks
        // Only use isSafe: true with trusted/internal HTML content
        elem.innerHTML = options.html;
    } else if (options?.html && !options?.isSafe) {
        // Fallback to text content if html is provided but not marked as safe
        // This prevents accidental XSS vulnerabilities
        elem.textContent = options.html;
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
