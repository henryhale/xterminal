import { describe, it, expect, beforeEach } from "vitest";
import Disposable from "../source/base/disposable";

describe("Disposable", () => {
    let disposable: Disposable;

    beforeEach(() => {
        disposable = new Disposable();
    });

    describe("constructor", () => {
        it("should not be disposed initially", () => {
            expect(disposable.isDisposed).toBe(false);
        });
    });

    describe("register", () => {
        it("should register disposable", () => {
            let disposed = false;
            const d = {
                dispose: () => {
                    disposed = true;
                }
            };
            disposable.register(d);
            disposable.dispose();
            expect(disposed).toBe(true);
        });

        it("should dispose immediately if already disposed", () => {
            disposable.dispose();
            let disposed = false;
            const d = {
                dispose: () => {
                    disposed = true;
                }
            };
            disposable.register(d);
            expect(disposed).toBe(true);
        });
    });

    describe("dispose", () => {
        it("should dispose all registered", () => {
            let count = 0;
            disposable.register({ dispose: () => count++ });
            disposable.register({ dispose: () => count++ });
            disposable.dispose();
            expect(count).toBe(2);
            expect(disposable.isDisposed).toBe(true);
        });

        it("should not dispose twice", () => {
            let count = 0;
            disposable.register({ dispose: () => count++ });
            disposable.dispose();
            disposable.dispose();
            expect(count).toBe(1);
        });
    });
});
