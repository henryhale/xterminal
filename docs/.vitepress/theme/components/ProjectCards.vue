<script setup>
const props = defineProps(["projects"]);
</script>

<template>
    <div class="grid">
        <div class="intro">
            <h1><b>Showcase</b></h1>
            <p>Below is a list of projects that are using XTerminal.</p>
            <p>
                To add yours, edit this
                <a
                    href="https://github.com/henryhale/xterminal/blob/master/docs/showcase/index.md"
                    >file</a
                >.
            </p>
        </div>
        <div v-for="(p, i) in projects" :key="i" class="row">
            <div class="grow">
                <div class="row">
                    <img :src="p.logo" :alt="p.name" width="45" />
                    <span>
                        {{ p.name }}<br />{{ p.desc }}<br />
                        <a :href="p?.author.link">@{{ p?.author.username }}</a>
                    </span>
                </div>
            </div>
            <div>
                <a :href="p.link">Visit &RightArrow;</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: flex;
    flex-direction: column;
    padding: 4rem 1rem;
}

.grid > * {
    margin-bottom: 2rem;
    width: 100%;
    max-width: 720px;
    margin: 0 auto;
}

.row {
    display: flex;
    align-items: center;
    padding: 1rem 0;
}

.row > *:not(:last-child) {
    margin-right: 1rem;
}

.grow {
    flex-grow: 1;
}

a {
    color: var(--vp-c-brand);
}

.intro h1 {
    font-size: 32px;
    letter-spacing: -0.02em;
    line-height: 40px;
    margin: 1rem 0;
}
</style>
