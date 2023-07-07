# Disposal

Nearly everything that makes up the terminal is disposable. Right from the base class to the events that are dispatched, all these can be disposed.

## Why dispose?

The `XTerminal` package is lightweight and on top of that, we fight so hard that its efficient during runtime. 

A disposable object refers to an object that can self detach itself from a parent via a [term.dispose()](../api/index.md#term-dispose) method.

With reference to the DOM, remember how `document.addEventListener` and `document.removeEventListener` work: one adds an event callback function and the other destroys it from the same event.

It is nearly the same here.

The significance of the `dispose` method on an object is not only to manage memory but also ensure that certain functionality only runs at specific times it is needed.

## Example

Suppose you have multiple instances of objects with each maintaining it's own state. When the use of the instance is done, we can then dispose its state thereby gracefully saving memory.

We can implement it like this: 

```js
const states = new WeakMap();

class State {
    // ...
}

function createState(app) {
    states.set(app, new State());
    let disposed = false;
    return {
        get state() {
            return states.get(app);
        },
        dispose() {
            if (disposed) return;
            disposed = true;
            states.delete(app);
        }
    }
}
```

Whenever we create a new state using `createState` from the above example, a _disposable state object_ is returned. This implies that when the `dispose` method on that object is invoked, the entire state for that app is deleted.

## Terminal Disposal

It is possible that we might want to close off the terminal and end it's usage. In this case, you can entirely dispose the terminal using [term.dispose()](../api/index.md#term-dispose). This will clear states of the underlying objects, dispose events, remove the HTML elements and their DOM events. 

This tears down the entire terminal and renders it not usable thereafter. 

**Example:** On window unload event (free up resources)

```js
window.onunload = () => term.dispose();
```