/**
 * Interface: History
 */
export interface IHistory {
    /**
     * Array containing a copy of entries
     */
    list: string[];

    /**
     * Getter: access one entry at a time (forward)
     */
    next: string;

    /**
     * Getter: access one entry at a time (backwards)
     */
    previous: string;

    /**
     * Insert an input string to the stack
     *
     * Returns `false` if the `input` is the same as the previous entry
     *
     * @returns boolean
     */
    add(input: string): boolean;

    /**
     * Empty the stack of entries
     */
    clear(): void;
}
