import { describe, it, expect, beforeEach } from "vitest";
import XHistory from "../source/history/index";

describe("XHistory", () => {
    let history: XHistory;

    beforeEach(() => {
        history = new XHistory();
    });

    describe("constructor", () => {
        it("should create with empty array", () => {
            expect(history.list).toEqual([]);
        });

        it("should create with initial state", () => {
            const h = new XHistory(["cmd1", "cmd2"]);
            expect(h.list).toEqual(["cmd2", "cmd1"]); // reversed
        });
    });

    describe("add", () => {
        it("should add new entry", () => {
            history.add("cmd1");
            expect(history.list).toEqual(["cmd1"]);
        });

        it("should not add duplicate consecutive entries", () => {
            history.add("cmd1");
            history.add("cmd1");
            expect(history.list).toEqual(["cmd1"]);
        });

        it("should add different entries", () => {
            history.add("cmd1");
            history.add("cmd2");
            expect(history.list).toEqual(["cmd1", "cmd2"]);
        });

        it("should not add empty string", () => {
            history.add("");
            expect(history.list).toEqual([]);
        });
    });

    describe("previous and next", () => {
        beforeEach(() => {
            history.add("cmd1");
            history.add("cmd2");
            history.add("cmd3");
        });

        it("should navigate previous", () => {
            expect(history.previous()).toBe("cmd3");
            expect(history.previous()).toBe("cmd2");
            expect(history.previous()).toBe("cmd1");
            expect(history.previous()).toBe("cmd1"); // stays at last
        });

        it("should navigate next", () => {
            history.previous(); // cmd3
            history.previous(); // cmd2
            expect(history.next()).toBe("cmd3");
            expect(history.next()).toBe("");
        });
    });

    describe("clear", () => {
        it("should clear all entries", () => {
            history.add("cmd1");
            history.clear();
            expect(history.list).toEqual([]);
        });
    });
});
