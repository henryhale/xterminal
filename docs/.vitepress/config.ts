import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/xterminal/',

  // metadata
  lang: 'en-US',
  title: 'XTerminal',
  description: 'Build web-based command line interfaces',

  // theme
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    siteTitle: 'XTerminal Docs',
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Examples', link: '/markdown-examples' },
      { 
        text: 'About',
        items: [
            { text: 'Team', link: '/about/team' },
            { text: 'History', link: '/about/history' },
            { text: 'Code of Conduct', link: '/about/coc' },
        ]
    },
    ],

    sidebar: [
      {
          text: 'Guide',
          items: [
              { text: 'Introduction', link: '/guide/' }
          ]
      },
      {
          text: 'Getting Started',
          items: [
              { text: 'Installation', link: '/guide/installation' },
              { text: 'Quick Start', link: '/guide/quick-start' },
          ]
      },
      {
          text: 'Essentials',
          items: [
            { text: 'Creating a Terminal', link: '/guide/creating-a-terminal' },
          ]
      },
      {
        text: 'Examples',
        items: []
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/henryhale' }
    ],

    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/henryhale/xterminal/edit/master/src/:path'
    },

    footer: {
      message: 'Released under the <a href="https://github.com/henryhale/xterminal/blob/master/LICENSE.txt">MIT License</a>.',
      copyright: `Copyright © 2023 - Present <a href="https://github.com/henryhale">Henry Hale</a>.`
    }

  }
})
