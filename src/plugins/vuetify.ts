/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import colors from 'vuetify/lib/util/colors'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.lighten1,
          secondary: colors.teal.lighten4,
          warning: colors.amber.base,
          success: colors.green.base,
          info: colors.blue.base,
          error: colors.red.base,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.teal.lighten1,
          secondary: colors.teal.lighten4,
          warning: colors.lime.accent1,
          success: colors.lightGreen.base,
          info: colors.blue.lighten4,
          error: colors.deepOrange.base,
        }
      },
    },
  },
})
