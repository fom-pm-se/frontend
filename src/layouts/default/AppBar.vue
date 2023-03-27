<template>
  <v-app-bar :elevation="4" color="primary">
    <v-app-bar-title>CRM</v-app-bar-title>
    <template v-slot:append>
      <v-btn @click="toggleTheme" color="secondary">Dark Mode</v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="js">
  import {useTheme} from "vuetify";

  export default {
    setup() {
      const theme = useTheme();
      return {
        theme,
        toggleTheme: () => {
          theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
        }
      }
    }
  }

</script>
