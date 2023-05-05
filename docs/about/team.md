---
layout: page
---

<script setup>
import { 
    VPTeamPage,
    VPTeamPageTitle,
    VPTeamMembers
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
            }
        ]
    },
];
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>Our Team</template>
        <template #lead>
            Say hello to our awesome team.
        </template>
    </VPTeamPageTitle>
    <VPTeamMembers :members="members" />
</VPTeamPage>
