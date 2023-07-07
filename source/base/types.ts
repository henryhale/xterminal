/**
 * Disposable object
 */
export interface IDisposable {
    dispose(): void;
}

/**
 * Effect - callback triggered when a reactive value changes
 */
export interface IEffect {
    (): void;
}

/**
 * Reactive value -> all effects are disposable
 */
export interface IReactive<T> extends IDisposable {
    value: T;
}
