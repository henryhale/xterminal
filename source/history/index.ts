import { isArray } from "../helpers";
import { IHistory } from "./interface";

/**
 * History stack
 */
export default class XHistory implements IHistory {
    private store;
    private ptr;

    constructor(initialState: string[] = []) {
        this.store = isArray(initialState) ? initialState : [];
        this.ptr = -1;
    }

    private get size(): number {
        return this.store.length;
    }

    public get list(): string[] {
        return [].slice.call(this.store).reverse();
    }

    add(input: string): boolean {
        if (input && input !== this.store[0]) {
            this.store.unshift(input);
            this.ptr = -1;
            return true;
        }
        return false;
    }

    get previous(): string {
        this.ptr++;
        if (this.ptr >= this.size) this.ptr = this.size - 1;
        return this.store[this.ptr] || "";
    }

    get next(): string {
        this.ptr--;
        if (this.ptr <= -1) this.ptr = -1;
        return this.store[this.ptr] || "";
    }

    clear(): void {
        this.store.splice(0);
    }
}
