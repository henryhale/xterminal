import type { IEventName, IEventListener } from "../types";

/**
 * State of the Event Emitter
 */
export type IEmitterState = {
    store: Map<IEventName, Set<IEventListener>>;
    stack: IEventName[];
};
