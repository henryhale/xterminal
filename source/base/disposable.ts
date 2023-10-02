import type { IDisposable } from "../types";

/**
 * Disposables
 *
 * https://blog.hediet.de/post/the_disposable_pattern_in_typescript
 *
 * https://github.com/xtermjs/xterm.js/blob/master/src/common/Lifecycle.ts
 */

// private store for states
const instances = new WeakMap<Disposable, IDisposable[]>();

export default class Disposable implements IDisposable {
    public isDisposed: boolean;

    constructor() {
        this.isDisposed = false;
        instances.set(this, []);
    }

    /**
     * Registers a disposable object
     * @param d The disposable to register
     */
    public register<T extends IDisposable>(d: T): void {
        if (this.isDisposed) {
            d?.dispose();
        } else {
            instances.get(this)?.push(d);
        }
    }

    /**
     * Disposes the object, triggering the `dispose` method on all registered disposables
     */
    public dispose(): void {
        if (this.isDisposed) return;
        this.isDisposed = true;
        const disposables = instances.get(this) as IDisposable[];
        for (const d of disposables) {
            d?.dispose();
        }
        instances.delete(this);
    }
}
