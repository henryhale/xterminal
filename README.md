<div align="center">
<img width="75" height="75" src="https://raw.githubusercontent.com/henryhale/xterminal/master/assets/logo-rounded.png" />
<h1>XTerminal</h1>
<p><i>Build Web-based Command-line Interfaces.</i></p>
<img alt="npm" src="https://img.shields.io/npm/v/xterminal">
<img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/henryhale/xterminal">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/xterminal">
<img alt="GitHub" src="https://img.shields.io/github/license/henryhale/xterminal">
</div>

## Overview

**Welcome to XTerminal!** 

This library provides a simple, lightweight and perfomant solution for creating interactive web-based command-line interfaces (CLIs) with ease in your web applications. It aims to be a minimalist dependency-free alternative to popular libraries like [jquery.terminal](https://github.com/jcubic/jquery.terminal), offering improved performance and a simplified approach.

## Inspiration

This project draws inspiration from the powerful [node:readline](https://nodejs.org/api/readline.html) module in Node.js, which has proven to be a reliable and efficient tool for command-line interactions. Additionally, inspiration is derived from the versatility and functionality of [xterm.js](https://github.com/xtermjs), a widely adopted library for web-based terminal emulators.

By combining the best features and ideas from these sources, this library aims to provide an accessible and performant solution for creating web-based CLIs that meet the needs of modern web applications.

## Live Demo

There is a quick demo online: [Try It Yourself](https://xterminal.js.org/demo/).

## Getting Started

### Installation

To install `xterminal`, use [npm](https://npmjs.org/xterminal):

```sh
npm install xterminal
```

alternatively use [unpkg](https://unpkg.com/xterminal) or [jsdelivr](https://cdn.jsdelivr.net/npm/xterminal).

### Basic Usage

Import the package and create a new instance of the `XTerminal` class:

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

For more detailed information, please refer to the [official documentation](https://xterminal.js.org/) online.

## Documentation

The complete documentation for `XTerminal` can be found [here](https://xterminal.js.org/). It provides detailed information on installation, configuration, usage, and advanced features. You'll also find code examples and API references.

The full Public API for `XTerminal` can also be found within this [TypeScript declaration file](https://github.com/henryhale/xterminal/blob/master/source/types.ts).

## Browser Support

Supporting wide range of browsers is the goal. Modern browsers, most specifically the latest versions of Chrome, Firefox, Safari, and Edge (for desktop and mobile devices) are supported.

## Contributing

Thank you for checking out this awesome project. Any contributions to the project are appreciated, whether it's fixing bugs, adding new features, or improving documentation. To contribute, please follow these guidelines:

- **Issues**: Before starting to work on a new feature or bug fix, please check the issue tracker to see if the task is already in progress or has been reported. If not, feel free to [open a new issue](https://github.com/henryhale/xterminal/issues/new) to discuss the proposed changes or bug fixes.
- **Branching**: Create a new branch for each feature or bug fix you are working on. Use clear descriptive branch names that reflect the purpose of your changes e.g. `feature/events` or `bugfix/issue-1234`.

## Development

To get started with development, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org) (>=18)
- [pnpm](https://pnpm.io/) (>=8)

### Setup

1. Clone this repository: `git clone https://github.com/henryhale/xterminal.git`
2. Navigate to the project directory: `cd xterminal`
3. Install dependencies: `pnpm install`
4. Start the development server: `pnpm dev`

### Building the Library

To build the library, run `pnpm build`

This will generate the production-ready distribution files in the `dist` directory.

## Related

- [chalk-dom](https://github.com/henryhale/chalk-dom) - Chalk for the browser
- [inken](https://github.com/henryhale/inken) - Terminal-like string styling for the browser
- [viteshell](https://github.com/henryhale/viteshell) - A minimal bash-like shell implementation written in TypeScript

## License

Copyright (c) 2023 [Henry Hale](https://github.com/henryhale/).

Released under the [MIT License](https://github.com/henryhale/xterminal/blob/master/LICENSE.txt).
