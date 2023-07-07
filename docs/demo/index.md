# Live Demo

---

<style>
    iframe { border: 0 none; }
    .demo .bp-main { padding: 0; }
</style>

<div class="demo">

<a href="../demo.html" target="_blank" rel="noreferrer">View fullpage demo</a>

<browser-preview>

<iframe src="../demo.html" height="400px"></iframe>

</browser-preview>

</div>

---

:::details Code

:::code-group

```css [styles.css]
@import url('https://unpkg.com/xterminal/dist/xterminal.css');

.error {
    color: rgb(248, 88, 88);
}

.spinner:after {
    animation: changeContent 0.8s linear infinite;
    content: "⠋";
}

@keyframes changeContent {
    10% { content: "⠙"; }
    20% { content: "⠹"; }
    30% { content: "⠸"; }
    40% { content: "⠼"; }
    50% { content: "⠴"; }
    60% { content: "⠦"; }
    70% { content: "⠧"; }
    80% { content: "⠇"; }
    90% { content: "⠏"; }
}
```

```html [index.html]
<link rel="stylesheet" href="styles.css">

<div id="app"></div>

<script src="https://unpkg.com/xterminal/dist/xterminal.umd.js"></script>

<script src="createShell.js"></script>
<script src="createTerminal.js"></script>

<script>
    window.onload = () => createTerminal('#app');
</script>
```

<<< @/public/demo.js#terminal{js:line-numbers} [createTerminal.js]

<<< @/public/demo.js#shell{js:line-numbers} [createShell.js]

:::
