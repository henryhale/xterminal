import { THEME, h } from "./dom";

/**
 * Generate a build for the output component
 * @param target The parent element in which it is mounted
 * @returns DOM reference to the console box and output container
 */
export default function outputBuild(target: HTMLElement) {
    const consoleBox = h<HTMLSpanElement>("span");

    const outputBox = h<HTMLDivElement>("div", {
        class: THEME.OUTPUT,
        children: [consoleBox]
    });

    target.appendChild(outputBox);

    return { outputBox, consoleBox };
}

/**
 * Generate a build for the input component
 * @param target The parent element in which it is mounted
 * @returns DOM reference to the input element
 */
export function inputBuild(target: HTMLElement) {
    const inputBox = h<HTMLInputElement>("input", {
        props: {
            spellcheck: false,
            autocapitalize: "off",
            autocomplete: "off"
        }
    });

    const stdin = h<HTMLDivElement>("div", {
        class: THEME.INPUT,
        children: [inputBox]
    });

    target.appendChild(stdin);

    return inputBox;
}
