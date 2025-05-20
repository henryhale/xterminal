# API Reference

### Application

- [XTerminal](#xterminal) extends [XEventEmitter](#xeventemitter)
- [XTerminal.version](#xterminal-version)
- [XTerminal.XEventEmitter](#xterminal-xeventemitter)
- [term.mount()](#term-mount)
- [term.dispose()](#term-dispose)

### Input

- [term.focus()](#term-focus)
- [term.blur()](#term-blur)
- [term.pause()](#term-pause)
- [term.resume()](#term-resume)
- [term.setCompleter()](#term-setcompleter)

### Output

- [term.write()](#term-write)
- [term.writeln()](#term-writeln)
- [term.clear()](#term-clear)
- [term.clearLast()](#term-clearlast)

### History

- [term.history](#term-history)
- [term.clearHistory()](#term-clearhistory)

---

## XEventEmitter

Event emitter

- **Type**

    ```ts
    // Event Identifier
    type IEventName = string | symbol;

    // Event Listener
    type IEventListener = (...args: unknown[]) => void;

    type IEventHandler = (ev: IEventName, listener: IEventListener) => void;

    interface IEventEmitter {
        on: IEventHandler;
        once: IEventHandler;
        off: IEventHandler;
        emit(ev: IEventName, ...args: unknown[]): void;
    }
    ```

- **Details**

    **Methods**

    `on`: Appends a event listener to the specified event

    `once`: Appends a **one-time** event listener to the specified event

    `off`: Removes an event listener from the specified event

    `emit`: Triggers an event with arguments if any

- **See also:** [Guide - Events](../guide/events.md)

## XTerminal

Creates a terminal instance

- **Type**

    ```ts
    interface TerminalApi {
        // ...
    }

    interface TerminalOptions {
        target: HTMLElement | string;
    }

    class XTerminal extends XEventEmitter implements TerminalApi {
        constructor(options: TerminalOptions);
    }
    ```

- **Details**

    The constructor takes one argument, `options` containing the `target` element reference.
    
    If the `target` element is provided, the [term.mount()](#term-mount) method is called automatically.

- **Example**

    ```js
    import XTerminal from 'xterminal';

    const term = new XTerminal({/* options */});
    ```

- **See also:** [Guide - Creating a Terminal](../guide/initialization.md#creating-your-first-terminal)

## XTerminal.version

The version number

- **Type**

    ```ts
    interface TerminalApi {
        readonly version: string;
    }
    ```

- **Details**

    This is a static property that stores the version used. It is important when reporting bugs or issues.

- **Example**

    ```js
    import XTerminal from 'xterminal';

    console.log(XTerminal.version);
    ```

## XTerminal.XEventEmitter

The event emitter class

- **Type**

    Same as [XEventEmitter](#xeventemitter).

- **Details**

    This is a static property (class) that can be used to create independent instances 

- **Example**

    Using the [UMD build](../guide/installation.md#installation):
    ```js
    const emitter = new XTerminal.XEventEmitter();
    ```

    Using [ESM build](../guide/installation.md#installation) (tree shakeable):
    ```js
    import { XEventEmitter } from 'xterminal';

    const emitter = new XEventEmitter();
    ```

## term.mount()

Mounts the terminal instance structure to the specified DOM element.

- **Type**

    ```ts
    interface TerminalApi {
        mount(target: HTMLElement | string): void;
    }
    ```

- **Details**

    It takes one argument that must be an actual DOM element or a CSS selector. The element's `innerHTML` is cleared first and then the terminal structure is rendered.

    If no argument is passed, it throws an error and nothing is rendered.

    The `term.mount()` method should only be called once for each terminal instance only if the `target` element option in the [constructor](#xterminal) is not provided.

- **Example**

    ```js
    import XTerminal from 'xterminal';

    const term = new XTerminal();
    term.mount('#app');
    ```

    or mount to an actual DOM element directly: 

    ```js
    term.mount(
        document.getElementById('app')
    );
    ```

- **See also:** [Guide - Creating a Terminal](../guide/initialization.md#creating-your-first-terminal)


## term.dispose()

Gracefully close the terminal instance.

- **Type**

    ```ts
    interface TerminalApi {
        dispose(): void;
    }
    ```

- **Details**

    This detaches all event listeners, unmounts the terminal from the DOM and clears the backing functionality of the terminal.

    _The terminal should not be used again once disposed._

- **Example**

    Dispose on window unload event

    ```js
    window.onunload = () => term.dispose();
    ```

- **See also:** [Guide - Disposal](../guide/disposal.md)

## term.focus()

Focus the terminal input component - ready for input.

- **Type**

    ```ts
    interface TerminalApi {
        focus(): void;
    }
    ```
  
- **Details**
  
  This method takes no argument. It focuses the underlying input component of the terminal.

  Clicking or tapping in the terminal also invokes the method.

- **Example**

    After mounting the terminal instance
    
    ```js
    term.focus();
    ```

## term.blur()

Blurs the terminal input component.

- **Type**

    ```ts
    interface TerminalApi {
        blur(): void;
    }
    ```

- **Details**

    This method blurs the input component of the terminal.
  
- **Example**

    ```js
    term.blur();
    ```

## term.pause()

Deactivate the terminal input component.

- **Type**
  
    ```ts
    interface TerminalApi {
        pause(): void;
    }
    ```
  
- **Details**

    This method will stop events and input from being written to the terminal but rather input will be buffered.

    **NB:** It is used in conjuction with [term.resume()](#termresume).

- **Example**

    Prevent a user from sending input (non-interactive mode)
    
    ```js
    term.pause();
    ```

- **See also:** [Guide - Pause & Resume](../guide/prompt.md#pause--resume)

## term.resume()

Activate the terminal input component

- **Type**

    ```ts
    interface TerminalApi {
        resume(): void;
    }
    ```
  
- **Details**
  
    This method will enable events dispatch and user input if they were deactivate using [term.pause()](#termpause). 

- **Example**

    Pause the terminal until user input is required

    ```js
    term.pause();
    // ...
    // do something
    // ...
    term.resume();
    ```

- **See also:** [Guide - Pause & Resume](../guide/prompt.md#pause--resume)

## term.setCompleter()

Sets the autocomplete function that is invoked on Tab key.

- **Type**
  
    ```ts
    interface TerminalApi {
        setCompleter(fn: (data: string) => string): void;
    }
    ```
  
- **Details**

    This method take one argument that is a function which takes a string parameter and returns a string. 

    The autocomplete functionality depends highly on the completer function `fn`.

    The `fn` parameter should return a better match for the input data string. 

- **Example**

    ```js
    term.setCompleter(data => {
        const options = ['.help', '.clear', '.exit'];
        return options.filter(s => s.startsWith(data))[0] || '';
    });
    ```

- **See also:** [Guide - Autocomplete](../guide/autocomplete.md)

## term.write()

Write data to the terminal.

- **Type**
  
    ```ts
    interface TerminalApi {
        write(data: string | number, callback?: () => void): void;
    }
    ```
  
- **Details**

    `data`: The data to write to the terminal

    `callback`:  Optional function invoked on successful write

- **Example**

    ```js
    term.write('John: Hello ');
    term.write('from the Eastside', () => console.log('Done!'));
    ```

- **See also:** [Guide - Output](../guide/output.md#output)

## term.writeln()

Write data to the terminal, followed by a break line character (\n).        

- **Type**
  
    ```ts
    interface TerminalApi {
        writeln(data: string | number, callback?: () => void): void;
    }
    ```
  
- **Details**

    `data`: The data to write to the terminal

    `callback`:  Optional function invoked on successful write

- **Example**

    ```js
    term.writeln('Hello World!');
    term.writeln('Welcome!', () => console.log('Done!'));
    ```

- **See also:** [Guide - Output](../guide/output.md#output)

## term.clear()

Clear the entire terminal.

- **Type**
  
    ```ts
    interface TerminalApi {
        clear(): void;
    }
    ```
  
- **Details**
    
    When invoked, the entire terminal output is cleared.

    This method also triggers the `clear` event.

- **Example**

    Clear on CTRL+L using [keypress](../guide/events.md#default-events) event

    ```js
    term.on('keypress', e => {
        if (e.key == 'l' && e.ctrlKey) {
            term.clear();
        }
    });
    ```

- **See also:** [Guide - Example using events](../guide/events.md#example)
- **See also:** [Guide - Output](../guide/output.md#clear-screen)

## term.clearLast()

Remove the element containing the previous output.

- **Type**
  
    ```ts
    interface TerminalApi {
        clearLast(): void;
    }
    ```
  
- **Details**

    This is like the undo for only one write operation.
  
- **Example**

    Greet with `Hello World` and replace it with `Hello Dev` after 5 seconds

    ```js
    term.writeln('Hello World!');
    setTimeout(() => {
        term.clearLast();
        term.write('Hello Dev!');
    }, 5000);
    ```

- **See also:** [Guide - Output](../guide/output.md#clear-last-output)


## term.history

Access the history stack.

- **Type**
    
    ```ts
    interface TerminalApi {
        history: string[];
    }
    ```

- **Details**
  
    Manages an array of entries in the history stack. 

- **Example**

    Log the history whenever a new entry is added

    ```js
    term.on('data', () => console.log(term.history));
    ```

- **See also:** [History](../guide/history.md)

## term.clearHistory()

Clear the entire history stack.

- **Type**
    
    ```ts
    interface TerminalApi {
        clearHistory(): void;
    }
    ```

- **Details**
  
    It take no argument as its sole role is to clear the entire local history of inputs which are accessible iteratively using `ArrowUp` and `ArrowDown` keys. 

- **Example**

    Clear history on `CTRL+H` using [keypress](../guide/events.md#default-events) event

    ```js
    term.on('keypress', e => {
        if (e.ctrlKey && e.key == 'h') {
            term.clearHistory();
        }
    });
    ```

- **See also:** [History](../guide/history.md)
