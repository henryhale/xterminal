<script setup>
const props = defineProps(['projects']);
</script>

<template>
    <div class='grid'>
        <div v-for='(p, i) in projects' :key='i' class="row">
            <div class="grow">
                <div class="row">
                    <img :src='p.logo' :alt='p.name' width="45" />
                    <span>
                        {{ p.name }}<br>{{ p.desc }}<br>
                        <a :href='p?.author.link'>@{{ p?.author.username }}</a>
                    </span>
                </div>
            </div>
            <div>
                <a :href='p.link'>Visit &RightArrow;</a>
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

.grid>* {
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

.row>*:not(:last-child) {
    margin-right: 1rem;
}

.grow {
    flex-grow: 1;
}

a {
    color: var(--vp-c-brand);
}
</style>