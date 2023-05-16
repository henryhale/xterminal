# Disposal

Nearly everything that makes up the terminal is disposable. Right from the base class to the events that are dispatched, all these can be disposed.

## Why dispose?

The `XTerminal` package is lightweight and on top of that, we fight so hard that its efficient during runtime. 

A disposable object refers to an object that can self detach itself from a parent via a `dispose` method.

With reference to the DOM, remember how `document.addEventListener` and `document.removeEventListener` work: one adds an event callback function and the other destroys it from the same event. It is nearly the same here.

The significance of the `dispose` method on an object is not only to manage memory but also ensure that certain functionality only runs at specific times it is needed.

### Example

Let's say we have an array of functions, `arr` and a `dispose` function which when invoked clears the `arr` and set the flag `isDisposed` to `true`.

```js
const arr = [
    () => 1,
    () => 2,
    () => 3,
    () => 4,
    () => 5,
];

let isDisposed = false;

function dispose() {
    if (isDisposed) return;
    isDisposed = true;
    arr.splice(0);
}
```

When `dispose` is called, the flag `isDisposed` ensures that it is executed only once.


> :warning: under construction....

