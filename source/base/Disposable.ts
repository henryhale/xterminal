import { IDisposable } from '../types';

export default class Disposable implements IDisposable {
    
    private _isDisposed: boolean;
    private _disposables: IDisposable[];

    constructor() {
        this._isDisposed = false;
        this._disposables = [];
    }

    public get isDisposed() {
        return this._isDisposed;
    }

    public register<T extends IDisposable>(d: T): T {
        this._disposables.push(d);
        return d;
    }

    public dispose(): void {
        if (this._isDisposed) return;
        this._isDisposed = true;
        for (const d of this._disposables) {
            d.dispose();
        }
        this._disposables.length = 0;
    }

}
