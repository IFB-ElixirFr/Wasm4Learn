// https://nuxt.com/docs/api/configuration/nuxt-config

import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      repo_name: process.env.repo_name,
      repo_url: process.env.repo_url
    },
  },
  target: 'static',
  buildModules: [
    '@nuxt/image'
  ],
  modules: [
    '@pinia/nuxt',
    'nuxt-content-assets',
    '@nuxt/content',
    '@vueuse/nuxt',
  ],
  app: {
    baseURL: '/Wasm4Learn/',
    head: {
      title: 'Wasm4Learn',
      meta: [
        {
          name: 'description',
          content: 'An interactive tutorial platform to introduce you to the first commands in different languages like R and Python'
        }
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/@ruby/wasm-wasi@latest/dist/browser.umd.js",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://www.france-bioinformatique.fr/wp-content/uploads/logo-ifb-couleur.svg' }
      ],
    },
  },
  ssr: false,
  nitro: {
    serveStatic: true,
  },
  content: {
    sources: {
      github: {
        prefix: '', // Prefix for routes used to query contents
        driver: 'github', // Driver used to fetch contents (view unstorage documentation)
        repo: "IFB-ElixirFr/Wasm4Learn-content",
        branch: "main",
        dir: "content", // Directory where contents are located. It could be a subdirectory of the repository.
        // Imagine you have a blog inside your content folder. You can set this option to `content/blog` with the prefix option to `/blog` to avoid conflicts with local files.
      },
    },
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: {
        'rehype-katex': {
          output: 'html' // the default value is 'htmlAndMathml'
        }
      }
    },
    experimental: {
      clientDB: true
    },
    navigation: {
      fields: ['_dir']
    },
    highlight: {
      preload: [
        'r'
      ],
      theme: {
        // Default theme (same as single string)
        default: 'github-light',
        // Theme used if `html.dark`
        dark: 'github-dark',
        // Theme used if `html.sepia`
        sepia: 'monokai'
      }
    },
  },
  css: ['vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',],
  build: {
    transpile: ['vuetify', '@pinia/nuxt'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      'defineStore', // import { defineStore } from 'pinia'
      ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
  routeRules: {
    '/**': { prerender: true },
    '/dashboard/**': { ssr: false }
  },
  render: {
    static: {
      setHeaders(res: any) {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
      }
    }
  },
})