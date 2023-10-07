# Creating Your First Terminal

## Terminal instance

The `XTerminal` package exports the [XTerminal](../api/index.md#xterminal) class by default for public consumption.
To create your own terminal, you need to create an instance of it.

```js
const term = new XTerminal();
```

## Mounting the terminal

There will be nothing rendered on your page not until the `target` element is provided via the [constructor options](../api/index.md#xterminal) or [term.mount()](../api/index.md#term-mount) method is called.

**For example:** Let's say our app container is `#app`, then the markup should be;

```html
<div id="app"></div>
```

Initialize the terminal instance with `#app` as the target using one of the following:

- CSS selector

    ```js
    const term = new XTerminal();
    term.mount("#app"); // [!code ++]
    ```

- DOM reference

    ```js
    const term = new XTerminal();
    term.mount( // [!code ++]
        document.querySelector("#app") // [!code ++]
    ); // [!code ++]
    ```

- Options object

    ```js
    const term = new XTerminal(); // [!code --]
    const term = new XTerminal({ // [!code ++]
        target: "#app" // or document.querySelector("#app") // [!code ++]
    }); // [!code ++]
    ```

Choosing one of the above basically sets up the terminal HTML structure, key bindings added, and then rendered in the target element `#app`.

## Multiple terminal instances

You can create several single terminal instances on the same page since the [XTerminal](../api/index.md#xterminal) class creates an independent instance for each of them.

Example:

```js
const term1 = new XTerminal();
term1.mount("#app1");

const term2 = new XTerminal();
term2.mount("#app2");

const term3 = new XTerminal();
term3.mount("#app3");
```

Each one of the created instances can be configured to work differently independent of the others.

## Next Step

Configure the terminal to suite your application needs.
