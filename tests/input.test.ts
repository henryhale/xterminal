import { describe, it, expect, beforeEach, afterEach } from "vitest";
import XInputComponent from "../source/input/index";
import type { IOutputInterface } from "../source/output/interface";

describe("XInputComponent", () => {
    let input: XInputComponent;
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        input = new XInputComponent(container);
    });

    afterEach(() => {
        input.dispose();
        document.body.removeChild(container);
    });

    describe("constructor", () => {
        it("should create input element", () => {
            expect(input.el).toBeInstanceOf(HTMLInputElement);
            expect(container.contains(input.el)).toBe(true);
        });
    });

    describe("focus and blur", () => {
        it("should focus the input", () => {
            input.focus();
            expect(document.activeElement).toBe(input.el);
        });

        it("should blur the input", () => {
            input.focus();
            input.blur();
            expect(document.activeElement).not.toBe(input.el);
        });
    });

    describe("pause and resume", () => {
        it("should pause and resume", () => {
            input.pause();
            // @ts-expect-error testing private property
            expect(input.isActive.value).toBe(false);
            input.resume();
            // @ts-expect-error testing private property
            expect(input.isActive.value).toBe(true);
        });
    });

    describe("setValue", () => {
        it("should set input value", () => {
            input.setValue("test");
            expect(input.el.value).toBe("test");
            // @ts-expect-error testing private property
            expect(input.data.value).toBe("test");
        });
    });

    describe("clear", () => {
        it("should clear input value", () => {
            input.setValue("test");
            input.clear();
            expect(input.el.value).toBe("");
            // @ts-expect-error testing private property
            expect(input.data.value).toBe("");
        });
    });

    describe("pipe", () => {
        it("should pipe to output", () => {
            const output = {
                el: document.createElement("div")
            } as IOutputInterface;
            input.pipe(output);
            expect(output.el.children.length).toBe(3); // before, cursor, after
        });
    });

    describe("dispose", () => {
        it("should dispose", () => {
            input.dispose();
            expect(input.isDisposed).toBe(true);
        });
    });
});
