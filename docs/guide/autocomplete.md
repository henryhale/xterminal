<script setup>
import BrowserPreview from '../.vitepress/theme/components/BrowserPreview.vue';
</script>

# AutoComplete

Tab autocompletion saves a lot of time. It enables the user to type less of what
they need thereby being not only interactive but also productive. 

## How does it work?

The user inputs data in the terminal and presses the `enter` key, the input is saved in an internal history stack (accessible as an array). When the user types a partial string of an already input string, then presses the `tab` key, we can loop through the history array for matches and set the most recent one as the input value iteratively.

In addition to that, we can also include an external list of strings to use when matching.

## Implementation

To implement the above methodology, we need to keep track of the history array and this can achieved using the `history` event which when emitted passes the entire list as the only parameter.

Let's create a local history list, `inputHistory` to be synced with the internal list on inputs.

```js
const inputHistory = [];

term.on('history', list => {
    inputHistory.push(list[list.length - 1]);
});
```

We can synchronize the two lists by using `history` event and capturing only the most recently added item.

Now that they will be in sync, we can now implement and add the autocomplete function like

```js
const matches = [];

term.setCompleter(str => {
    if (!matches.length) {
        matches.push(
            ...inputHistory.filter(c => c.startsWith(str))
        );
    }
    return matches.pop();
});
```

The `matches` array is dynamic as it only keeps strings that start with the partial string `str`. The value on top of the stack, `matches`, is retrieved one at a time until it is empty thereby generating a new list of matched strings.

At this point, typing a few inputs, followed by the `enter` key generates a considerable list of history. Typing a partial, followed by the `tab` key, should do the job.

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

Press `tab` key just once sets the input value to `history`. Then `hack` after another hit, and finally `help`. Deleting two characters from the input string `help` leaves `he`, pressing the `tab` key once more only moves on cycle to `help`.

## Next Steps


