# Quick Start

To get started, you need to [install XTerminal](./installation.md) and ship the `CSS` and `JS` from XTerminal `dist` folder into your application.

Here is a quick setup using the [CDN installation guide](./installation.md#using-cdn). This setup requires a simple project structure with three essential files; `index.html`, `styles.css` and `main.js` in the same directory.

::: code-group

```html :line-numbers [index.html]
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Terminal</title>
    <link rel="stylesheet" href="https://unpkg.com/xterminal/dist/xterminal.css">
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    <div id="app"></div>
    <script src="https://unpkg.com/xterminal/dist/xterminal.umd.js"></script>
    <script src="./main.js"></script>
</body>
</html>
```

```css :line-numbers [styles.css]
* {
  box-sizing: border-box;
}

html, body {
  padding: 0;
  margin: 0;
  overflow: hidden; /* prevent page from scrolling */
}

#app {
  height: 100vh; /* occur the entire page */
}
```

```js :line-numbers [main.js]
// create a new terminal instance
const term = new XTerminal();

// mount the terminal to page
term.mount('#app');

// prompt style
const promptStyle = '[user] $ ';

// write prompt style and prepare for input
function ask() {
  term.write(promptStyle);
}

// capture data event
term.on('data', input => {
  if (input == 'clear') {
    // clear screen
    term.clear();
  } else {
    // do something
    term.writeln('Data: ' + input);
  }
  // then prompt user for more input
  ask();
});

// print greeting message
term.writeln('Hello World!');

// initiate
ask();
```

:::

Open the `index.html` file in your browser.

<browser-preview>

    Hello World!
    [user] $ ▊
</browser-preview>

::: tip
Follow the rest of the guide to customize, add interactivity, and also learn how to setup your own terminal application.
:::

## Next Step

If you skipped the [introduction](./index.md), you're strongly recommend reading it before moving on to the rest of the documentation.

Otherwise continue reading the guide. It takes you through details of the library. 