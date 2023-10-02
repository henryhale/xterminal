# History

## List

Whenever the user inputs data in the terminal and presses the `Enter` key, the input is saved in an internal history stack (accessible as an array) via [term.history](../api/index.md#term-history).

**Example:** 

```js
term.on('data', () => console.log(term.history));
```

The above snippet logs the history list in the console everytime a new entry is added.

## Changing State

Sometimes, there might arise a need to swap between application state. You can change the history stack using;

```js
const newHistoryState = [/* ... */];

term.history = newHistoryState;
```

## Clear History

You might want to clear the entire history list for some reasons. You can do that using the [term.clearHistory()](../api/index.md#term-clearhistory).

**Example:**

Let's clear the history on `CTRL+H` using the `keypress` event.

```js
term.on('keypress', (ev) => {
    if (ev.key.toLowerCase() == 'h' && ev.ctrlKey) {
        ev.cancel();
        term.clearHistory();
    }
});
```

## Next Step

Enhanced user interaction with key bindings to the terminal