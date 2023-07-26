// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  target: 'static',
  buildModules: [
    '@nuxt/image',
  ],
  ssr: false,
  app: {
    baseURL: '/R_WASM/',
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
})
