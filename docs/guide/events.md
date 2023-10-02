# Events

The [XTerminal](../api/index.md#xterminal) class, from which we create an instance, extends an internal [EventEmitter](../api/index.md#xeventemitter) class.
This implies that we can handle events the same way the browser does to provide interaction through events like:
click, keydown, and so on.

The underlying [EventEmitter](../api/index.md#xeventemitter) exposes, the `on`, `off`, `once`, and `emit` methods.

- `on` is used to add an event listener that's executed when the event is triggered
- `off` is used to remove an event listener from an event
- `once` is used to add a one-time event listener, it is triggered only once and then removed using `off`
- `emit` is used to trigger an event

## Custom Events

Let's create a `start` event, and as a matter of providing an example, the reaction to the event is a simply outputting to the terminal.

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

### Arguments

You can pass multiple arguments to the event handler by passing them as additional arguments to `term.emit()`.

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
Any event listener added using the `term.once()` method is executed once and deleted thereafter when the event is triggered.

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

- `data` event - triggered when user inputs data and presses the _Enter_ key
- `clear` event - triggered on [term.clear()](../api/index.md#term-clear)
- `keypress` event - triggered on every key press except _Tab, Enter, ArrowUp_ and _ArrowDown_
- `pause` event - triggered on [term.pause()](./prompt.md#pause--resume), when the terminal input is _deactivated_ or _paused_
- `resume` event - triggered on [term.resume()](./prompt.md#pause--resume), when the terminal input is _activated_ or _resumed_

### Example

In this example, we are going to capture the user's input and simply write it to the terminal.

First, add an event listener for the `data` event to capture data, output it and then ask for more input thereafter. We clear the terminal on recieving the input matching to `clear` and as a result, everything is erased from the terminal including the prompt style. Let's also add a `keypress` event to clear the terminal.

:::details Code

```js
term.on('data', (input) => {
    if (input == 'clear') {
        // clear the terminal
        term.clear();
    } else {
        // first write the input back
        term.write(input);
        // do something
        term.writeln('Data: ' + input);
    }
    // write the prompt again
    term.write("$ ");
});

term.on('clear', () => {
    term.writeln('You cleared the terminal');
});

term.on('keypress', (ev) => {
    /**
     * Checkout the event object
     */
    console.log(ev);

    // on CTRL+L - clear
    if (ev.key.toLowerCase() == 'l' && ev.ctrlKey) {
        
        // prevent default behaviour
        ev.cancel();

        // clear and trigger `clear` event
        term.clear();
    }
});
```
:::

The terminal will be cleared incase the user inputs `clear` or presses the shortcut `CTRL+L` which triggers the `clear` event that logs `You cleared the terminal` on the screen.

## Limitations

Multiple events can exist on the same terminal instance which is an advantage. However you should keep caution on when every event is triggered.

:::warning Nested Emits
When an event is triggered, it is added on top of the emitting stack and then the listeners attached to the event are invoked synchronously. 
If you emit the same event within one of the listeners, it will not work.
:::

**Example:** 

The code sample below will not work as expected.

```js
term.on('run', () => {
    console.log('running...');
    // ...
    term.emit('run');
});
```

Triggering the event `run` will log in the console: `running...`, do stuff, and attempt to trigger itself again (possible deadlock).

**Workaround**

Trigger the same event in the next event loop.

```js{4}
term.on('run', () => {
    console.log('running...');
    // ...
    setTimeout(() => term.emit('run'), 0);
});
```

## Next Step

You'll learn to everything about the prompt including activation, styling, blur and focus.  
