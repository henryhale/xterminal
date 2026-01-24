import { describe, it, expect, beforeEach, afterEach } from "vitest";
import XOutputComponent from "../source/output/index";

describe("XOutputComponent", () => {
    let output: XOutputComponent;
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        output = new XOutputComponent(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    describe("constructor", () => {
        it("should create output elements", () => {
            expect(output.el).toBeInstanceOf(HTMLDivElement);
            expect(container.contains(output.el)).toBe(true);
        });
    });

    describe("write", () => {
        it("should write data", () => {
            output.write("Hello World");
            expect(output.el.textContent).toContain("Hello World");
        });

        it("should parse newlines", () => {
            output.write("line1\nline2");
            expect(output.el.innerHTML).toContain("<br>");
        });

        it("should call callback", () => {
            let called = false;
            output.write("test", () => {
                called = true;
            });
            expect(called).toBe(true);
        });

        it("should call onoutput", () => {
            let called = false;
            output.onoutput = () => {
                called = true;
            };
            output.write("test");
            expect(called).toBe(true);
        });
    });

    describe("writeSafe", () => {
        it("should escape HTML", () => {
            output.writeSafe("<script>");
            expect(output.el.innerHTML).toContain("&lt;script&gt;");
        });
    });

    describe("clear", () => {
        it("should clear output", () => {
            output.write("test");
            output.clear();
            expect(output.el.innerHTML).toBe("<span></span>");
        });
    });

    describe("clearLast", () => {
        it("should clear last output", () => {
            output.write("first");
            output.write("second");
            output.clearLast();
            expect(output.el.textContent).toBe("first");
        });
    });
});
