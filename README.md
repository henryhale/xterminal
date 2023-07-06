<div align="center">
<img width="75" height="75" src="https://raw.githubusercontent.com/henryhale/xterminal/master/assets/logo-rounded.png" />
<h1>XTerminal</h1> 
<p><i>Build web-based command line interfaces.</i></p>
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/henryhale/xterminal/npm-publish.yml">
<img alt="npm" src="https://img.shields.io/npm/v/xterminal">
<img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/henryhale/xterminal">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/xterminal">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/xterminal">
</div>

## What is XTerminal?

`XTerminal` is a simple, lightweight and perfomant front-end component written in TypeScript that lets you create terminal-like interfaces for use in the browser.
It only provides the platform for rendering terminal output and accepting keyboard input, that is a terminal emulator.

> **Note:** It can't be connected to your terminal nor ssh, it's entirely browser based.
> If you're searching for a full blown command line program (web terminal), then check out [xterm.js](https://github.com/xtermjs).


## Key Features

- **Self-contained**: Requires no dependencies to work.
- **Perfomant**: It is lightweight and really fast.
- **Simple and minimal**: Learn the basics that can be built on top of with little configuration.
- **Debuggable**: The natural elements (div,span,...) can be inspected in your browser's devtools.
- **Well documented**: Right from getting started, configurations, APIs, and beyond.
- **TypeScript Support**: Smooth development with TypeScript Intellisense support in your code editor.

## Live Demo

In the [demo](https://github.com/henryhale/xterminal/tree/demo) branch, there is a quick demo. [Try it Online](https://henryhale.github.io/xterminal/).

![](https://raw.githubusercontent.com/henryhale/xterminal/demo/media/screenshot.png)

## Getting Started

Install the module via [NPM](https://npmjs.org/package/xterminal). Run the following command to add XTerminal as a dependency.

```sh
npm install xterminal
```

Setup your `index.html` page as follows, add the `xterminal.js` and `xterminal.css`, create a terminal container `<div id="terminal"></div>` in which xterminal will be mounted. Instantiate the `XTerminal` object and then call the `mount` function with the container reference `#terminal`.

```html
<!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="node_modules/xterminal/dist/xterminal.css" />
      <script src="node_modules/xterminal/dist/xterminal.umd.js"></script>
    </head>
    <body>
      <div id="terminal"></div>
      <script>
        var term = new XTerminal();
        term.mount('#terminal');
        term.write('Hello, Dev!\n$ ');
        term.prompt();
      </script>
    </body>
  </html>
```

### Alternative installation

You can add `xterminal.js` and `xterminal.css` using to your HTML page using any CDN that ships npm packages e.g [unpkg](https://unpkg.com/xterminal).

```html
  <link rel="stylesheet" href="https://unpkg.com/xterminal/dist/xterminal.css" />
  <script src="https://unpkg.com/xterminal/dist/xterminal.umd.js"></script>
```

## API

The full API for xterminal.js is contained within the [TypeScript declaration file](https://github.com/henryhale/xterminal/blob/master/types/terminal.d.ts).

## Example

The following example demonstrates a simple terminal where you type anything,
hit enter, and it logs the input string.

> **Note**: There is no backing shell and so input just flows back to the terminal.

### HTML

```html
<div id="terminal"></div>
```

### JavaScript

```js
const term = new XTerminal();

term.mount(
  document.getElementById('terminal')
);

term.writeln('Welcome to XTerminal!')
    .write('Demo\t[hint] type anything and hit enter\n# ');

term.on('data', input => {
  term.writeln(input)
      .writeln("Data: " + input)
      .write("# ");
  term.prompt();
});

term.focus();

term.prompt();
```

## Browser Support

Supporting wide range of browsers is the goal. Modern browsers, most specifically the latest versions of Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## Contributing

Thank you so much for taking your time to check out `xterminal`.

Contributions are welcome, here are areas that need your help;

- Testing
- Documentation
- ... anything else

## Related

- [chalk-dom](https://github.com/henryhale/chalk-dom) - Chalk for the browser
- [inken](https://github.com/henryhale/inken) - Terminal-like string styling for the browser

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale/).

Released under the [MIT License](https://github.com/henryhale/xterminal/blob/master/LICENSE.txt).
