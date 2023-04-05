<template>
  <v-app-bar :elevation="4" color="primary">
    <v-app-bar-title>CRM</v-app-bar-title>
    <template v-slot:append>
      <v-tooltip text="Toggle Theme" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-wrench" @click="toggleTheme"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Logout" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-logout" @click="logout"></v-btn>
        </template>
      </v-tooltip>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
  import {useTheme} from "vuetify";
  import {defineComponent} from "vue";

  export default defineComponent({
    setup() {
      const theme = useTheme();
      return {
        theme,
        toggleTheme: () => {
          theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
        }
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    }
  });
</script>
