import DefaultTheme from "vitepress/theme";

// @ts-ignore
import BrowserPreview from "./components/BrowserPreview.vue";
// @ts-ignore
import ProjectCards from "./components/ProjectCards.vue";

import "./assets/styles.css";

export default {
    extends: DefaultTheme,
    enhanceApp(ctx) {
        ctx.app.component('BrowserPreview', BrowserPreview);
        ctx.app.component('ProjectCards', ProjectCards);
    }
};