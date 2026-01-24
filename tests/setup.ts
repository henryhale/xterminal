import { beforeAll } from "vitest";

// Mock scrollTo for jsdom
Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    writable: true,
    value: function (x: number, y: number) {
        this.scrollTop = y;
        this.scrollLeft = x;
    }
});

beforeAll(() => {
    // Any global setup
});
