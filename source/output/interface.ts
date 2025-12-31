/**
 * Interface: Output Component
 */
export interface IOutputInterface {
    /**
     * Container element housing the console box
     */
    el: HTMLDivElement;

    /**
     * Inbuilt callback function for every write operation
     */
    onoutput?: () => void;

    /**
     * Output data to the console
     */
    write(data: string, callback?: () => void): void;

    /**
     * Safely output data to the console
     */
    writeSafe(data: string, callback?: () => void): void;

    /**
     * Clear the console
     */
    clear(): void;

    /**
     * Remove the element containing the previous output
     */
    clearLast(): void;
}
