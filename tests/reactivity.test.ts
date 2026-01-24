import { describe, it, expect } from "vitest";
import { ref, createEffect } from "../source/base/reactivity";

describe("Reactivity", () => {
    describe("ref", () => {
        it("should create reactive value", () => {
            const r = ref(10);
            expect(r.value).toBe(10);
        });

        it("should update value", () => {
            const r = ref("hello");
            r.value = "world";
            expect(r.value).toBe("world");
        });

        it("should notify effects", () => {
            const r = ref(0);
            let count = 0;
            createEffect(() => {
                count = r.value;
            });
            r.value = 5;
            expect(count).toBe(5);
        });

        it("should dispose", () => {
            const r = ref(0);
            let count = 0;
            createEffect(() => {
                count = r.value;
            });
            r.dispose();
            r.value = 10;
            expect(count).toBe(0); // should not update
        });
    });

    describe("createEffect", () => {
        it("should run effect immediately", () => {
            let ran = false;
            createEffect(() => {
                ran = true;
            });
            expect(ran).toBe(true);
        });

        it("should subscribe to reactive values", () => {
            const r = ref(0);
            let value = 0;
            createEffect(() => {
                value = r.value * 2;
            });
            expect(value).toBe(0);
            r.value = 5;
            expect(value).toBe(10);
        });
    });
});
