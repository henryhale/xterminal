<div align="center">
<h1>XTerminal</h1> 
<p><i>Build web-based CLI interfaces.</i></p>
<img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/henryhale/xterminal/npm-publish.yml">
<img alt="npm" src="https://img.shields.io/npm/v/xterminal">
<img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/henryhale/xterminal">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/xterminal">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/xterminal">
</div>

XTerminal is a simple, lightweight and perfomant front-end component written in TypeScript that lets you create terminal-like interfaces for use in the browser.

## Key Features

- **Self-contained**: Requires no dependencies to work.
- **Perfomant**: It is lightweight and really fast.
- **Simple and minimal**: Learn the basics that can be built on top of with little configuration.
- **Debuggable**: The natural elements (div,span,...) can be inspected in your browser's devtools.
- **Well documented**: Right from getting started, configurations, APIs, and beyond. 
- **Efficient Execution**: Commands are executed asynchronously and efficiently uses the event loop.
- **TypeScript Support**: Smooth development with TypeScript Intellisense support in your code editor.

## Getting Started

Install the module via [NPM](https://npmjs.org/package/xterminal). Run the following command to add XTerminal as a dependency. 

```sh
npm install xterminal
```

Setup your `index.html` page as follows, add the `xterminal.js` and `xterminal.css`, create a terminal container `<div id="terminal"></div>` in which xterminal will be mounted. Instantiate the `Terminal` object and then call the `mount` function with the container reference `#terminal`.

```html
<!doctype html>
  <html>
    <head>
      <link rel="stylesheet" href="node_modules/xterminal/dist/xterminal.css" />
      <script src="node_modules/xterminal/dist/xterminal.js"></script>
    </head>
    <body>
      <div id="terminal"></div>
      <script>
        var term = new XTerminal();
        term.mount('#terminal'); 
        term.write('Hello, Dev!\n$ ');
      </script>
    </body>
  </html>
```

### Alternative installation

You can add `xterminal.js` and `xterminal.css` using to your HTML page using [unpkg](https://unpkg.com/xterminal).

```html
    <link rel="stylesheet" href="https://unpkg.com/xterminal/dist/xterminal.css" />
    <script src="https://unpkg.com/xterminal/dist/xterminal.js"></script>
```

## API

The full API for xterminal.js is contained within the [TypeScript declaration file](https://github.com/henryhale/xterminal/blob/master/types/terminal.d.ts).

## Browser Support

Supporting wide range of browsers is the goal. Modern browsers, most specifically the latest versions of  Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale/).

Released under the [MIT License](./LICENSE).
