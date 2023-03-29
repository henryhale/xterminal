const { copyFileSync, readFileSync } = require('node:fs');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');

const pkg = (() => {
  return JSON.parse(readFileSync('./package.json', 'utf8'));
})();

const banner = `
/**
 *  XTerminal - v${pkg.version}
 *  @author Henry Hale
 *  @license MIT
 *  -> https://github.com/henryhale/xterminal
 */`;

function copyToDist() {
  return {
    closeBundle: () => {
      copyFileSync('./LICENSE.txt', './dist/LICENSE.txt');
      console.log(`[Y]: copied license file to dist/`);
      copyFileSync('./types/terminal.d.ts', './dist/types.d.ts');
      console.log(`[Y]: copied typings file to dist/`);
    },
  };
}

module.exports = {
  input: 'out/index.js',
  output: {
    name: 'XTerminal',
    file: pkg.browser,
    format: 'umd',
    banner,
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: { __VERSION__: pkg.version },
    }),
    babel({ babelHelpers: 'bundled' }),
    terser(),
    copyToDist(),
  ],
};
