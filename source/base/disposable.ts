import type { IDisposable } from "../types";

/**
 * Disposables
 *
 * https://blog.hediet.de/post/the_disposable_pattern_in_typescript
 *
 * https://github.com/xtermjs/xterm.js/blob/master/src/common/Lifecycle.ts
 */

export default class Disposable implements IDisposable {
    // private store for states
    #disposables: IDisposable[];

    public isDisposed: boolean;

    constructor() {
        this.isDisposed = false;
        this.#disposables = [];
    }

    /**
     * Registers a disposable object
     * @param d The disposable to register
     */
    public register<T extends IDisposable>(d: T): void {
        if (this.isDisposed) {
            d?.dispose();
        } else {
            this.#disposables.push(d);
        }
    }

    /**
     * Disposes the object, triggering the `dispose` method on all registered disposables
     */
    public dispose(): void {
        if (this.isDisposed) return;
        this.isDisposed = true;
        this.#disposables.forEach((d) => d?.dispose());
    }
}
