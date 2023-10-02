import { isFunction } from "../helpers";
import outputBuild from "../renderer/index";
import { SPACE, h } from "../renderer/dom";
import type { IOutputInterface } from "./interface";

const TAB_SIZE = 4;

function parseOutput(data: string): string {
    return ("" + data)
        .replace(/(\n)|(\n\r)|(\r\n)/g, "<br/>")
        .replace(/\s{2}/g, SPACE.repeat(2))
        .replace(/\t/g, SPACE.repeat(TAB_SIZE));
}

/**
 * Output Component
 */
export default class XOutputComponent implements IOutputInterface {
    public el: HTMLDivElement;
    private console: HTMLSpanElement;
    private lastOutput: HTMLSpanElement | undefined;
    public onoutput?: () => void;

    constructor(target: HTMLElement) {
        const { outputBox, consoleBox } = outputBuild(target);
        this.el = outputBox;
        this.console = consoleBox;
    }

    public write(data: string, callback?: (() => void) | undefined): void {
        this.lastOutput = h<HTMLSpanElement>("span", {
            html: parseOutput(data)
        });
        this.console.appendChild(this.lastOutput);
        if (isFunction(this.onoutput)) this.onoutput();
        if (isFunction(callback)) callback();
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
