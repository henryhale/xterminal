import { copyFileSync, readFileSync } from 'node:fs';
import terser from '@rollup/plugin-terser';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const replacer = replace({
  preventAssignment: true,
  values: { __VERSION__: pkg.version },
});

const banner = `
/**
 *  XTerminal - v${pkg.version}
 *  @author Henry Hale
 *  @license MIT
 *  @url https://github.com/henryhale/xterminal
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

export default [
  {
    input: 'out/index.js',
    output: {
      name: 'XTerminal',
      file: pkg.browser,
      format: 'umd',
      banner,
    },
    plugins: [
      replacer,
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },
  {
    input: 'out/index.js',
    output: {
      file: pkg.module,
      format: 'esm',
      banner,
    },
    plugins: [replacer, terser(), copyToDist()],
  },
]