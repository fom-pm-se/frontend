/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// @ts-ignore
import colors from 'vuetify/lib/util/colors'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: isDarkMode() ? 'dark' : 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#00ACC1",
          secondary: "#00ACC1",
          warning: colors.amber.base,
          success: colors.green.base,
          info: colors.blue.base,
          error: colors.red.base,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#353535',
          secondary: '#26C6DA',
          warning: colors.lime.accent1,
          success: colors.lightGreen.base,
          info: colors.blue.lighten4,
          error: colors.deepOrange.base,
        }
      },
    },
  },
})

function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
