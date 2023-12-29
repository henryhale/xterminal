---
layout: page
---

<script setup>
const showcase = [
    {
        name: 'ESJS',
        desc: 'Lenguaje de programación en Español',
        link: 'https://es.js.org',
        logo: 'https://es.js.org/assets/logo.png',
        author: {
            username: 'enzonotario',
            link: 'https://github.com/enzonotario'
        },
    },
    {
        name: 'VIX',
        desc: 'Boostrap your own web based CLI application',
        link: 'https://henryhale.github.io/vix',
        logo: 'https://henryhale.github.io/vix/xterminal.png',
        author: {
            username: 'henryhale',
            link: 'https://github.com/henryhale'
        },
    },
    {
        name: 'TELEMATE',
        desc: 'A small scale messaging application for devs',
        link: 'https://github.com/henryhale/telemate',
        logo: 'https://github.com/henryhale/telemate/raw/master/client/public/logo.svg',
        author: {
            username: 'henryhale',
            link: 'https://github.com/henryhale'
        },
    },
    {
        name: 'DB-ADMIN',
        desc: 'Interact with your databases in the browser',
        link: 'https://github.com/henryhale/db-admin',
        logo: 'https://github.com/henryhale/db-admin/raw/master/client/public/favicon.png',
        author: {
            username: 'henryhale',
            link: 'https://github.com/henryhale'
        },
    },
];
</script>

<project-cards :projects='showcase'></project-cards>


