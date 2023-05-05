# Getting started with XTerminal

## Installation

Below are some of the ways XTerminal can be installed;

- [CDN](./installation.md#using-cdn) - (for development with a simple setup)
- [NPM](./installation.md#using-npm) - (use this if you are using bundlers or having a build step)

## Using NPM

[NPM](https://npmjs.org) is a popular javascript package manager on which [XTerminal](https://npmjs.org/xterminal) is a public npm package that can be installed by anyone.

To install it, run one of the following comands;

::: code-group

```sh [npm]
npm install xterminal
```

```sh [pnpm]
pnpm add xterminal
```

:::

It provides a production build of the latest release from it's [GitHub repository](https://github.com/henryhale/xterminal/).

**Usage**

First include the styles in your markup:

```html
<link rel="stylesheet" href="./node_modules/xterminal/dist/xterminal.css">
```

Then import the script into your application.

```js
import Terminal from 'xterminal';
```

## Using CDN

You can use any CDN that serves npm packages;

These deliver npm packages globally over their fast content delivery network.

Install via cdn using one of the following;

::: code-group

```html [unpkg]
<link rel="stylesheet" href="https://unpkg.com/xterminal/dist/xterminal.css">
<script src="https://unpkg.com/xterminal/dist/xterminal.js"></script>
```

```html [jsdelivr]
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xterminal/dist/xterminal.css">
<script src="https://cdn.jsdelivr.net/npm/xterminal/dist/xterminal.js"></script>
```

:::

## Next Steps

Now that you know how to install XTerminal, it is time to dive into the essential parts.  
