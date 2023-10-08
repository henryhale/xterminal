---
layout: page
---

<script setup>
import { 
    VPTeamPage,
    VPTeamPageTitle,
    VPTeamMembers,
    VPTeamPageSection
} from 'vitepress/theme';

const members = [
    {
        name: 'Henry Hale',
        title: 'Creator',
        avatar: 'https://www.github.com/henryhale.png',
        org: 'xterminal',
        orgLink: 'https://github.com/henryhale/xterminal',
        links: [
            { 
                icon: 'github', 
                link: 'https://github.com/henryhale' 
            },
            { 
                icon: 'twitter', 
                link: 'https://twitter.com/devhenryhale'
            }
        ]
    },
];

const contributors = [
    {
        name: 'Enzo Notario',
        title: 'Full Stack Developer',
        avatar: 'https://www.github.com/enzonotario.png',
        links: [
            { 
                icon: 'github', 
                link: 'https://github.com/enzonotario'
            },
        ]
    }
];
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>Our Team</template>
        <template #lead>Say hello to our awesome team.</template>
    </VPTeamPageTitle>
    <VPTeamMembers :members="members" />
    <VPTeamPageSection>
        <template #title>Contributors</template>
        <template #lead>A big shout out to these awesome people</template>
        <template #members>
            <VPTeamMembers size="small" :members="contributors" />
        </template>
    </VPTeamPageSection>
</VPTeamPage>
