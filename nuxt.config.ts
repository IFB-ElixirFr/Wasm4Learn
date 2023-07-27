// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  target: 'static',
  ssr: false,
  buildModules: [
    '@nuxt/image',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxt/content'
  ],
  content: {
    experimental: {
      clientDb: true
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
  router: {
    options: {
      strict: true,
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
  render: {
    static: {
      setHeaders(res: any) {
        res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
        res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
      }
    },
    script: [
      { 'src': '~/webr-serviceworker.js', tagPosition: 'bodyClose' },
      { 'src': '~/webr-worker.js', tagPosition: 'bodyClose' },
    ],
  },
})