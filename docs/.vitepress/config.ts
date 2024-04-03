import { defineConfig } from 'vitepress'

const TITLE = "XTerminal";
const DESCRIPTION = 'Build web-based command line interfaces';
const IMAGE = "/logo.svg";
const LINK = "https://henryhale.github.io/xterminal";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/',

  // metadata
  lang: 'en-US',
  title: TITLE,
  description: DESCRIPTION,

  head: [
    // favicon
    ['link', { rel: 'shortcut icon', href: IMAGE }],

    // open graph - facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: LINK }],
    ['meta', { property: 'og:title', content: TITLE }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:image', content: IMAGE }],

    // twitter
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:url', content: LINK }],
    ['meta', { property: 'twitter:title', content: TITLE }],
    ['meta', { property: 'twitter:description', content: DESCRIPTION }],
    ['meta', { property: 'twitter:image', content: IMAGE }],
  ],

  // theme
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    siteTitle: TITLE,
    logo: IMAGE,

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Demo', link: '/demo/' },
      { text: 'Showcase', link: '/showcase/' },
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
        collapsed: false,
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
