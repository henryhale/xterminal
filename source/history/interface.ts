/**
 * History
 */
export interface IHistory {
    next: string;
    previous: string;
    list: string[];
    size: number;
    add(input: string): boolean;
    clear(): void;
}
