<script setup>
import BrowserPreview from '../.vitepress/theme/components/BrowserPreview.vue';
</script>

# Events

The `Terminal` class, from which we create an instance, extends an internal `EventEmitter` class.
This implies that we can handle events the same way the browser does to provide interaction through events like:
clicks, key presses, and so on.

The underlying `EventEmitter` exposes, the `on`, `off`, `once`, `emit` and `stopEmit` methods.

- `on` is used to add a callback function (event listener) that's executed when the event is triggered
- `emit` is used to trigger an event
- `off` is used to remove a callback function from an event
- `once` is used to add a one-time event listener, it is triggered only once and then removed using `off`
- `stopEmit` is used to stop the execution of callbacks for the triggered event

## Custom Events

Let's create a `start` event, and as a matter of providing an example, the reaction to the event is a simply 
outputting to the terminal.

```js
term.on('start', () => {
    term.writeln('started...');
});
```

When we run the `emit` method passing the `start` event, 

```js
term.emit('start');
```

the event handler function is triggered, and we get the terminal log.

### Multiple Arguments

You can pass multiple arguments to the event handler by passing them as additional arguments to `emit()`.

```js
term.on('start', (id) => {
    term.writeln('started...', id);
});

term.emit('start', 5173);
```

Example with multiple arguments:

```js
term.on('start', (start, end) => {
    term.writeln(`started from ${start} to ${end}`);
});

term.emit('start', 1, 10);
```

### One-Time Event

In some cases, it might be necessary to only run an operation once and only once.
Any event listener added using the `once()` method is executed once and deleted thereafter when the event is triggered.

```js
term.once('load', () => {
    term.writeln('loaded...');
});

term.emit('load');
term.emit('load');
```

The `load` event is triggered and will output to the terminal for the first `term.emit('load')`.
The second event trigger does nothing since there is no event listener for the `load` event anymore.

### Symbols

So far, the event names used are strings. JavaScript symbols can as well be used to create events too.

```js
const START_EVENT = Symbol('start');

term.on(START_EVENT, () => {
    term.writeln('started with a symbol...');
});

term.emit(START_EVENT);
```

## Default Events

Every terminal instance has existing events that are used internally and can be used in your application lifecycle.
They include:

- `data` event - triggered when user inputs data and presses the Enter key
- `clear` event - triggered on `CTRL + L` or `term.clear()`
- `history` event - triggered when ever the terminal's input history record changes (no duplicate inputs are stored) 
- `close` event - triggered on `CTRL + C` or `term.terminate()`
  
### Example

In this example, we are going to capture the user's input and simply write it to the terminal.

Let's first write a function, `ask`, that will prompt the user for input by printing the prompt style.

```js
const promptStyle = '[root@web] $ ';

function ask() {
    term.write(promptStyle);
    term.prompt();
}
```

:::info Note
Don't mind the `term.prompt()` right now, all it does is to activate the terminal for input.
:::

Then add an event listener for the `data` event to capture data, output it and then ask for more input thereafter. We clear the terminal on recieving the input matching to `clear` and as a result, everything is erased from the terminal including the prompt style.

```js
term.on('data', (input) => {
    if (input == 'clear') {
        term.clear();
    } else {
        term.writeln('Data: ' + input);
        ask();
    }
});

term.on('clear', () => {
    term.writeln('You cleared the terminal');
    ask();
});
```

:::warning Note
We don't call `ask()` when `input == 'clear'` as the `term.clear()` call emits the `clear` event that triggers another `ask()` operation.

The keyboard shortcut `CTRL + L` will clear the terminal and emit the `clear` event but that is behind the scenes. No prompt style will be written producing a side effect where the cursor is ready but the user isn't sure about that. 
This is why we call `ask()` when the `clear` event is emitted.
:::

Initialize the terminal for interaction by calling `ask()`.

Here is the complete example:

```js :line-numbers
const term = new XTerminal();

term.mount('#app');

function ask() {
    term.write('[root@web] # ');
    term.prompt();
}

term.on('data', (input) => {
    if (input == 'clear') {
        term.clear();
    } else {
        term.writeln('Data: ' + input);
        ask();
    }
});

term.on('clear', () => {
    term.writeln('You cleared the terminal');
    ask();
});

ask(); // [!code ++]
```

## Next Steps

You'll learn to everything about the prompt inlcuding activation, styling, blur and focus.  
