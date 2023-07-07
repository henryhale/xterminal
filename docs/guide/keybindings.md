# Key Bindings

These are shortcuts to enhance the command-line experience. Basically, they are keyboard keys 
bound to your terminal to provide functionality that would ease the use.

::: info Note
Key bindings to your terminal only work when the terminal is **focused** so that the action triggered is bound to that instance. 
:::

## Enter Key

When the `Enter` key is pressed, the terminal captures the current input value, clears the input, adds value to the history stack and then fire the `data` event passing the input value.

## ArrowUp Key

When the `ArrowUp` key is pressed, it continously interates through the previous entries as it sets each entry as the current input.

It runs through the local history stack while setting the corresponding entry at a certian index as the current terminal input.

::: info Note
No duplicate entries are pushed to the history stack. If the previous input is the same as the current, the latter won't be pushed to the history stack.
:::

All in all, this key goes backwards in history.

## ArrowDown Key

In case the `ArrowUp` key is hit several times, to return to the most recent input, the `ArrowDown` key is used.

The `ArrowDown` key goes foreward in history by setting the most recent entry as the current input.If no previous input exist, the input is set to the previously buffered input, nothing otherwise.

## Tab key

Just like in real terminal applications, the `Tab` key provides the autocomplete future for the commands starting with the characters currently present in the terminal input.

If the terminal input is empty, then there are no characters to match.

For effective autocompletion, you must set a function that will work out the best matches.
This is can be done using the [term.setCompleter()](../api/index.md#term-setcompleter) method on the terminal instance which is discussed on the next page.

## Custom Key Bindings

You can create your own key bindings and add the desired functionality for each one of them. We can employ the [keypress event](./events.md#default-events) to attach the key bindings.

**Example:**

Suppose that you want to capture these shortcuts: `CTRL+S`, `ALT+D`, `CTRL+SHIFT+K`

```js
term.on('keypress', (ev) => {
    
    const key = ev.key.toLowerCase();

    // CTRL+S
    if (ev.ctrlKey && key == 's') {
        // use `ev.cancel()` to prevent default behaviour
        ev.cancel();
        // do something
    }

    // ALT+D
    if (ev.altKey && key == 'd') {
        // do something
    }

    // CTRL+SHIFT+K
    if (ev.ctrlKey && ev.shiftKey && key == 'k') {
        // do something
    }

});
```

## Next Step

Enhance a rich interactive command-line interface with tab autocompletion.
