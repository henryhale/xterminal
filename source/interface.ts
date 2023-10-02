import type { IInputInterface } from "./input/interface";
import type { IOutputInterface } from "./output/interface";
import type { IHistory } from "./history/interface";

/**
 * Terminal State
 */
export type ITerminalState = {
    /**
     * Input component for the terminal
     */
    input: IInputInterface;

    /**
     * Output component for the terminal
     */
    output: IOutputInterface;

    /**
     * History: store of inputs
     */
    history: IHistory;

    /**
     * Autocomplete function invoked on TAB key
     */
    completer?: (data: string) => string;
};
