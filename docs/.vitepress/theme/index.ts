import DefaultTheme from "vitepress/theme";

// @ts-ignore
import BrowserPreview from "./components/BrowserPreview.vue";

import "./assets/styles.css";

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('BrowserPreview', BrowserPreview);
    }
};