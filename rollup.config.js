const { copyFileSync, readFileSync } = require("node:fs");
const terser = require("@rollup/plugin-terser");
const babel = require("@rollup/plugin-babel");
const replace = require("@rollup/plugin-replace");

const pkg = (() => {
    return JSON.parse(readFileSync('./package.json', 'utf8'));
})();

function copyToDist() {
    return {
      closeBundle: () => {
        copyFileSync('./LICENSE', './dist/LICENSE');
        console.log(`[Y]: copied license file to dist/`);
        copyFileSync('./types/terminal.d.ts', './dist/types.d.ts');
        console.log(`[Y]: copied typings file to dist/`);
      }
    }
}

module.exports = {
    input: 'out/index.js',
    output: {
        name: 'XTerminal',
        file: pkg.browser,
        format: 'umd'
    },
    plugins: [
        replace({
            preventAssignment: true,
            values: { __VERSION__: pkg.version }
        }),
        babel({ babelHelpers: 'bundled' }), 
        terser(),
        copyToDist()
    ]
};
