# Creating Your First Terminal

## Terminal instance

The `XTerminal` package exports the [XTerminal](../api/index.md) class by default for public consumption.
To create your own terminal, you need to create an instance of it.

```js
const term = new XTerminal();
```

From the example above, the constructor takes no arguments and it simply initializes our instance.

## Mounting the terminal

There will be nothing rendered on your page not until the [`mount()`](../api/index.md) method is called. 
It expects only _one argument_ that can be either a _string selector_ or an _actual reference to a DOM element_ 
that's already on the same page.

For example: Let's say our app container is `#app`, then the markup should be;

```html
<div id="app"></div>
```

Initialize the terminal instance with `#app` as the target.

With a CSS selector

```js
const term = new XTerminal();
term.mount('#app'); // [!code ++]
```

Or use the actual reference to the target DOM element

```js
const term = new XTerminal();
term.mount( // [!code ++]
    document.getElementById('app') // [!code ++]
); // [!code ++]
```

When the instance is created, it builds up the terminal HTML structure and adds key-bindings.
When the [mount()](../api/index.md) method is called, the markup is then rendered in the target element `#app`.

## Multiple terminal instances

You can create several single terminal instances on the same page since the [XTerminal](../api/index.md) class creates an independent instance for each of them.

Example:

```js
const term1 = new XTerminal();
term1.mount('#app1');

const term2 = new XTerminal();
term2.mount('#app2');

const term3 = new XTerminal();
term3.mount('#app3');
```

Each one of the created instances can be configured to work differently independent of the others.

## Next Steps

Configure the terminal to suite your application needs.
