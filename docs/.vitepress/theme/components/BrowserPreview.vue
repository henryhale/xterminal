<template>
    <div>
        <div class="bp-preview">
            <b>Preview: </b>
        </div>
        <div class="bp-container">
            <header class="bp-header">
                <div class="bp-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="bp-title">My First Terminal</div>
            </header>
            <main class="bp-main">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<style>
*,
*::after,
*::before {
    box-sizing: border-box;
}

.bp-preview {
    margin-bottom: 1rem;
}

.bp-container {
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    background-color: var(--vp-code-block-bg);
    color: #efefef;
    overflow: hidden;
    border: 1px solid var(--vp-code-block-bg);
}

.bp-header {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
}
.bp-header > .bp-title {
    flex-grow: 1;
    text-align: right;
    font-size: min(15px, calc(1.5vw + 7px));
}
.bp-header .bp-dots > * {
    display: inline-block;
    width: min(0.65rem, calc(2.25vw));
    height: min(0.65rem, calc(2.25vw));
    border-radius: 50%;
    margin-right: min(0.25rem, calc(1vw));
}
.bp-header .bp-dots > *:first-child {
    background-color: rgba(255, 91, 82, 1);;
}
.bp-header .bp-dots > *:nth-child(2) {
    background-color: rgba(83, 195, 43, 1);
}
.bp-header .bp-dots > *:last-child {
    background-color: rgba(230, 192, 41, 1);
}

.bp-main {
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: hidden;
    padding: 0 min(15px, calc(1.5vw + 5px));
    background-color: rgba(225,225,225,0.05);
}

html.dark .bp-main {
    background-color: rgb(41, 40, 40);
}
html.dark .bp-container {
    color: rgba(239, 239, 239, 0.85);
}
</style>
