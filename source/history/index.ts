import { isArray } from "../helpers";
import { IHistory } from "../types";

export default class XHistory implements IHistory {
    private _store;
    private _ptr;
    private _maxSize;

    constructor(initialState: string[] = []) {
        this._store = isArray(initialState) ? initialState : [];
        this._ptr = -1;
        this._maxSize = 0;
    }

    get size(): number {
        return this._store.length;
    }

    get list(): string[] {
        return [].slice.call(this._store).reverse();
    }

    set maxSize(val: number) {
        this._maxSize = val;
    }

    add(input: string): boolean {
        if (input && input !== this._store[0]) {
            this._store.unshift(input);
            if (this._maxSize) {
                this._store.splice(this._maxSize);
            }
            this._ptr = -1;
            return true;
        }
        return false;
    }

    get previous(): string {
        this._ptr++;
        if (this._ptr >= this.size) this._ptr = this.size - 1;
        return this._store[this._ptr] || "";
    }

    get next(): string {
        this._ptr--;
        if (this._ptr <= -1) this._ptr = -1;
        return this._store[this._ptr] || "";
    }

    clear(): void {
        this._store.splice(0);
    }
}
