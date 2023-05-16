# Key Bindings

These are shortcuts to enhance the command-line experience. Basically, they are keyboard keys 
bound to your terminal to provide functionality that would ease the use.

::: info Note
Key bindings to your terminal only work when the terminal is **focused** so that the action triggered is bound to that instance. 
:::

## ArrowUp Key

When the `ArrowUp` key is pressed, it continously interates through the previously run  commands as it sets that command as the current input.

It runs through the history setting the corresponding command at a certian index as the current terminal input.

::: info Note
No duplicate commands are pushed to the history stack. If the previously run command is the same as the current, the latter won't be pushed to the history stack.
:::

All in all, this key goes backwards in history.

## ArrowDown Key

In case the `ArrowUp` key is hit several times, to return to the most recently run commands, the `ArrowDown` key is used.

The `ArrowDown` key goes foreward in history by setting the most recently run command as the current input. If no previously run commands, the input is set to the previously buffered input, nothing otherwise.

## Tab key

Just like in real terminal applications, the `Tab` key provides the autocomplete future for the commands starting with the characters currently present in the terminal input.

If the terminal input is empty, then there are no characters to match.

For effective autocompletion, you must set a function that will work out the best matches.
This is can be done using the `setCompleter()` method on the terminal instance which is discussed on the next page.

## Next Steps

Enhance a rich interactive command-line interface with tab autocompletion.
