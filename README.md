<div align="center">
<img width="75" height="75" src="https://raw.githubusercontent.com/henryhale/xterminal/master/assets/logo-rounded.png" />
<h1>XTerminal</h1>
<p><i>Build Web-based Command-line Interfaces.</i></p>
<img alt="npm" src="https://img.shields.io/npm/v/xterminal">
<img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/henryhale/xterminal">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/xterminal">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/xterminal">
</div>

## What is XTerminal?

`XTerminal` is a simple, lightweight and perfomant front-end component written in TypeScript that lets you create terminal-like interfaces for use in the browser.

> **Note:** It can't be connected to your terminal nor ssh, it's entirely browser based.
> If you're searching for a full blown command line program (web terminal), then check out [xterm.js](https://github.com/xtermjs).

## Live Demo

There is a quick demo online. [Try it Now](https://henryhale.github.io/xterminal/demo/).

## Getting Started

Checkout the [documentation](https://henryhale.github.io/xterminal/) online.

**Quick start**
<details>

```html
<link rel='stylesheet' href='https://unpkg.com/xterminal/dist/xterminal.css'>

<div id="app"></div>

<script src='https://unpkg.com/xterminal/dist/xterminal.umd.js'></script>

<script>
  const term = new XTerminal()
  term.mount('#app');
  term.write('Hello World!\n# ');
</script>
```

</details>

### Alternative installation

You can add `xterminal.js` and `xterminal.css` using to your HTML page using any CDN that ships npm packages e.g [unpkg](https://unpkg.com/xterminal).

```html
  <link rel="stylesheet" href="https://unpkg.com/xterminal/dist/xterminal.css" />
  <script src="https://unpkg.com/xterminal/dist/xterminal.umd.js"></script>
```

## API

The full API for xterminal.js is contained within the [TypeScript declaration file](https://github.com/henryhale/xterminal/blob/master/types/terminal.d.ts).

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
