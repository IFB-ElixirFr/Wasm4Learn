// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  target: 'static',
  buildModules: [
    '@nuxt/image',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/content'
  ],
  app: {
    baseURL: '/R_WASM/',
    head: {
      title: 'R WASM by IFB',
      meta: [
        {
          name: 'description',
          content: 'R WASM platform to learn R with IFB'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'https://www.france-bioinformatique.fr/wp-content/uploads/logo-ifb-couleur.svg' }
      ]
    },
  },
  ssr: false,
  nitro: {
    serveStatic: true,
  },
  content: {
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