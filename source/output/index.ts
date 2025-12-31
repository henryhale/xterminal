import { isFunction } from "../helpers";
import outputBuild from "../renderer/index";
import { SPACE, h } from "../renderer/dom";
import type { IOutputInterface } from "./interface";

const TAB_SIZE = 4;

function parseOutput(data = ""): string {
    return ("" + data)
        .replace(/(\n)|(\n\r)|(\r\n)/g, "<br/>")
        .replace(/\s{2}/g, SPACE.repeat(2))
        .replace(/\t/g, SPACE.repeat(TAB_SIZE));
}

// helper to prevent malicious user input from being printed
// - inserted into the dom (console)
function escapeHTML(data = ""): string {
    const span = document.createElement("span");
    span.textContent = data;
    console.log(span.innerHTML);
    return span.innerHTML;
}

/**
 * Output Component
 */
export default class XOutputComponent implements IOutputInterface {
    public el: HTMLDivElement;
    private console: HTMLSpanElement;
    private lastOutput?: HTMLSpanElement;
    public onoutput?: () => void;

    constructor(target: HTMLElement) {
        const { outputBox, consoleBox } = outputBuild(target);
        this.el = outputBox;
        this.console = consoleBox;
    }

    public write(data: string, callback?: () => void): void {
        this.lastOutput = h<HTMLSpanElement>("span", {
            html: parseOutput(data)
        });
        this.console.appendChild(this.lastOutput);
        if (isFunction(this.onoutput)) this.onoutput();
        if (isFunction(callback)) callback();
    }

    public writeSafe(data: string, callback?: () => void): void {
        this.write(escapeHTML(data), callback);
    }

    public clear(): void {
        if (this.console) {
            this.console.innerHTML = "";
        }
    }

    public clearLast(): void {
        if (this.lastOutput) {
            this.lastOutput.parentNode?.removeChild(this.lastOutput);
        }
        this.lastOutput = undefined;
    }
}
