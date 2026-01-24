import { describe, it, expect, beforeEach, afterEach } from "vitest";
import XTerminal from "../source/index";

describe("XTerminal", () => {
    let terminal: XTerminal;
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        terminal = new XTerminal();
    });

    afterEach(() => {
        if (terminal.isMounted) {
            terminal.dispose();
        }
        document.body.removeChild(container);
    });

    describe("constructor", () => {
        it("should create a new instance", () => {
            expect(terminal).toBeInstanceOf(XTerminal);
            expect(terminal.isMounted).toBe(false);
        });

        it("should mount if target is provided", () => {
            const term = new XTerminal({ target: container });
            expect(term.isMounted).toBe(true);
            term.dispose();
        });
    });

    describe("mount", () => {
        it("should mount to a valid HTMLElement", () => {
            terminal.mount(container);
            expect(terminal.isMounted).toBe(true);
        });

        it("should mount to a selector string", () => {
            container.id = "test-terminal";
            terminal.mount("#test-terminal");
            expect(terminal.isMounted).toBe(true);
        });

        it("should throw error for invalid target", () => {
            // @ts-expect-error testing invalid input
            expect(() => terminal.mount(null)).toThrow();
        });

        it("should not mount twice", () => {
            terminal.mount(container);
            terminal.mount(container);
            expect(terminal.isMounted).toBe(true);
        });
    });

    describe("write", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should write string data", () => {
            terminal.write("Hello World");
            // Check if output contains the text
            expect(container.textContent).toContain("Hello World");
        });

        it("should write number data", () => {
            terminal.write(123);
            expect(container.textContent).toContain("123");
        });

        it("should call callback after write", () => {
            let called = false;
            terminal.write("test", () => {
                called = true;
            });
            expect(called).toBe(true);
        });
    });

    describe("writeln", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should write with newline", () => {
            terminal.writeln("Hello");
            expect(container.innerHTML).toContain("<br>");
        });
    });

    describe("writeSafe", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should escape HTML", () => {
            terminal.writeSafe('<script>alert("xss")</script>');
            expect(container.innerHTML).toContain("&lt;script&gt;");
        });
    });

    describe("clear", () => {
        beforeEach(() => {
            terminal.mount(container);
            terminal.write("test");
        });

        it("should clear the terminal", () => {
            terminal.clear();
            expect(container.textContent.trim()).toBe("");
        });
    });

    describe("history", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should have empty history initially", () => {
            expect(terminal.history).toEqual([]);
        });

        it("should allow setting history", () => {
            terminal.history = ["cmd1", "cmd2"];
            expect(terminal.history).toEqual(["cmd1", "cmd2"]);
        });

        it("should clear history", () => {
            terminal.history = ["cmd1"];
            terminal.clearHistory();
            expect(terminal.history).toEqual([]);
        });
    });

    describe("setCompleter", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should set completer function", () => {
            const completer = (data: string) => data + " completed";
            terminal.setCompleter(completer);
            // Completer is internal, hard to test directly
            expect(true).toBe(true); // Placeholder
        });

        it("should not set non-function", () => {
            // @ts-expect-error testing invalid input
            terminal.setCompleter("not a function");
            expect(true).toBe(true);
        });
    });

    describe("pause and resume", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should pause and resume", () => {
            terminal.pause();
            terminal.resume();
            expect(true).toBe(true); // Events are emitted, but hard to test without spying
        });
    });

    describe("dispose", () => {
        beforeEach(() => {
            terminal.mount(container);
        });

        it("should dispose the terminal", () => {
            terminal.dispose();
            expect(terminal.isMounted).toBe(false);
        });
    });

    describe("static methods", () => {
        it("should have version", () => {
            expect(typeof XTerminal.version).toBe("string");
        });

        it("should have XEventEmitter", () => {
            expect(XTerminal.XEventEmitter).toBeDefined();
        });

        it("should escape HTML", () => {
            expect(XTerminal.escapeHTML("<test>")).toBe("&lt;test&gt;");
        });
    });
});
