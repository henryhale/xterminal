import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',

  // metadata
  lang: 'en-US',
  title: 'XTerminal',
  description: 'Build web-based command line interfaces',

  // theme
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    siteTitle: 'XTerminal',
    logo: '/logo.svg',

    search: {
      provider: 'local'
    },
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Demo', link: '/demo/' },
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
        collapsed: true,
        items: [
          { text: 'Initialization', link: '/guide/initialization' },
          { text: 'Output', link: '/guide/output' },
          { text: 'Events', link: '/guide/events' },
          { text: 'Prompt', link: '/guide/prompt' },
          { text: 'History', link: '/guide/history' },
          { text: 'Key Bindings', link: '/guide/keybindings' },
        ]
      },
      {
        text: 'Advanced',
        collapsed: true,
        items: [
          { text: 'AutoComplete', link: '/guide/autocomplete' },
          { text: 'Batch Mode', link: '/guide/batchmode' },
          { text: 'Disposal', link: '/guide/disposal' },
          { text: 'Theme', link: '/guide/theme' },
        ]
      },
      {
        text: 'API Reference',
        link: '/api/',
        items: [],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/henryhale/xterminal' }
    ],

    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/henryhale/xterminal/edit/master/docs/:path'
    },

    footer: {
      message: 'Released under the <a href="https://github.com/henryhale/xterminal/blob/master/LICENSE.txt">MIT License</a>.',
      copyright: `Copyright © 2023-present, <a href="https://github.com/henryhale">Henry Hale</a>.`
    }

  }
})
