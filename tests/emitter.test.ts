import { describe, it, expect, beforeEach } from "vitest";
import XEventEmitter from "../source/emitter/index";

describe("XEventEmitter", () => {
    let emitter: XEventEmitter;

    beforeEach(() => {
        emitter = new XEventEmitter();
    });

    describe("on", () => {
        it("should add event listener", () => {
            let called = false;
            emitter.on("test", () => {
                called = true;
            });
            emitter.emit("test");
            expect(called).toBe(true);
        });

        it("should handle multiple listeners", () => {
            let count = 0;
            emitter.on("test", () => count++);
            emitter.on("test", () => count++);
            emitter.emit("test");
            expect(count).toBe(2);
        });
    });

    describe("once", () => {
        it("should call listener only once", () => {
            let count = 0;
            emitter.once("test", () => count++);
            emitter.emit("test");
            emitter.emit("test");
            expect(count).toBe(1);
        });
    });

    describe("off", () => {
        it("should remove event listener", () => {
            let called = false;
            const listener = () => {
                called = true;
            };
            emitter.on("test", listener);
            emitter.off("test", listener);
            emitter.emit("test");
            expect(called).toBe(false);
        });
    });

    describe("emit", () => {
        it("should emit events with arguments", () => {
            let args: unknown[] = [];
            emitter.on("test", (...a) => {
                args = a;
            });
            emitter.emit("test", 1, "hello", { key: "value" });
            expect(args).toEqual([1, "hello", { key: "value" }]);
        });

        it("should prevent recursive emits", () => {
            let count = 0;
            emitter.on("test", () => {
                count++;
                if (count < 2) emitter.emit("test");
            });
            emitter.emit("test");
            expect(count).toBe(1);
        });

        it("should not emit if disposed", () => {
            let called = false;
            emitter.on("test", () => {
                called = true;
            });
            emitter.dispose();
            emitter.emit("test");
            expect(called).toBe(false);
        });
    });

    describe("dispose", () => {
        it("should dispose and clear store", () => {
            emitter.on("test", () => {});
            emitter.dispose();
            expect(emitter.isDisposed).toBe(true);
        });
    });
});
