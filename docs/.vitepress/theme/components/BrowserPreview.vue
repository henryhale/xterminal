<template>
    <div>
        <div class="preview">
            <b>Preview: </b>
        </div>
        <div class="container">
            <header>
                <div class="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="title">My First Terminal</div>
            </header>
            <main>
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<style scoped>
*,
*::after,
*::before {
    box-sizing: border-box;
}

.preview {
    margin-bottom: 1rem;
}

.container {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: var(--vp-code-block-bg);
    color: #efefef;
    overflow: hidden;
    border: 1px solid var(--vp-code-block-bg);
}

header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
}
header > .title {
    flex-grow: 1;
    text-align: right;
    font-size: min(15px, calc(1.5vw + 7px));
}
header .dots > * {
    display: inline-block;
    width: min(0.65rem, calc(2.25vw));
    height: min(0.65rem, calc(2.25vw));
    border-radius: 50%;
    margin-right: min(0.25rem, calc(1vw));
}
header .dots > *:first-child {
    background-color: rgba(255, 91, 82, 1);;
}
header .dots > *:nth-child(2) {
    background-color: rgba(83, 195, 43, 1);
}
header .dots > *:last-child {
    background-color: rgba(230, 192, 41, 1);
}

main {
    display: flex;
    flex-direction: column;
    max-height: 600px;
    overflow-y: hidden;
    padding: 0 min(15px, calc(1.5vw + 5px));
    background-color: rgba(225,225,225,0.05);
}

html.dark main {
    background-color: rgb(41, 40, 40);
}
html.dark .container {
    color: rgba(239, 239, 239, 0.85);
}
</style>
