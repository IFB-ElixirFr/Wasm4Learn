import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as labs from 'vuetify/labs/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const myCustomLightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    'background-gray': "#f2f2f2",
    surface: '#FFFFFF',
    primary: '#0080ba',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs,
    },
    directives,
    icons: {
      iconfont: 'mdi',
    },
    theme: {
      defaultTheme: 'myCustomLightTheme',
      themes: {
        myCustomLightTheme
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})