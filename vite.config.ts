import { defineConfig } from "vite";
import { copyFileSync, readFileSync } from "node:fs";
import banner from "vite-plugin-banner";
import { replaceCodePlugin } from "vite-plugin-replace";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));

function copyToDist() {
    return {
        name: "copy-to-dist",
        closeBundle: () => {
            copyFileSync("./LICENSE.txt", "./dist/LICENSE.txt");
            console.log(`[Y]: copied license file to dist/`);
            copyFileSync("./types/xterminal.d.ts", "./dist/types.d.ts");
            console.log(`[Y]: copied typings file to dist/`);
        }
    };
}

export default defineConfig({
    build: {
        lib: {
            entry: "source/main.ts",
            name: "XTerminal",
            formats: ["es", "umd"],
            fileName: (format) => {
                if (format === "umd") {
                    return `xterminal.umd.js`;
                }

                if (format === "es") {
                    return `xterminal.esm.js`;
                }

                return `xterminal.${format}.js`;
            }
        },
        rollupOptions: {
            output: {
                assetFileNames: "xterminal.[ext]"
            }
        }
    },
    plugins: [
        copyToDist(),
        replaceCodePlugin({
            replacements: [
                {
                    from: "__VERSION__",
                    to: pkg.version
                }
            ]
        }),
        banner(`/**
 *  XTerminal - v${pkg.version}
 *  @author Henry Hale
 *  @license MIT
 *  @url https://github.com/henryhale/xterminal
 */`)
    ]
});
