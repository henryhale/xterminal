# AutoComplete

Tab autocompletion saves a lot of time. It enables the user to type less of what
they need thereby being not only interactive but also productive. 

## How does it work?

The user inputs data in the terminal and presses the `Enter` key, the input is saved in an internal history stack (accessible as an array). When the user types a partial string of an already input string, then presses the `Tab` key, you can loop through the history array for matches and set the most recent one as the input value iteratively.

:::tip
In addition to that, you can also include an external list of strings to use when matching.
:::

## Implementation

To implement the above methodology, you need the [term.history](../api/index.md#history) which provide an copy of the entries.

Create and add the basic autocomplete function using [term.setCompleter()](../api/index.md#term-setcompleter).

```js
const matches = [];

term.setCompleter(str => {
    if (!matches.length) {
        matches.push(
            ...term.history.filter(c => c.startsWith(str))
        );
    }
    return matches.pop();
});
```

The `matches` array is dynamic as it only keeps strings that start with the partial string `str`. The value on top of the stack, `matches`, is retrieved one at a time until it is empty thereby generating a new list of matched strings.

At this point, typing a few inputs, followed by the `Enter` key appends the input to our history stack. Typing a partial, followed by the `Tab` key, should do the job.

## Illustration

Take the following log as a sample, we can test the tab autocompletion after typing a partial `h`

<browser-preview>

    [user] $ help
    help
    [user] $ hack
    hack
    [user] $ ls
    ls
    [user] $ history
    history
    [user] $ h▊
</browser-preview>

Press `Tab` key just once sets the input value to `history`. Then `hack` after another hit, and finally `help`. Deleting two characters from the input string `help` leaves `he`, pressing the `Tab` key once more only moves on cycle to `help`.
