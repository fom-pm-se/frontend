<template>
  <v-bottom-navigation
    mode="shift"
    color="secondary"
    elevation="8"
    border
  >
    <v-btn
      v-for="item in items"
      :key="item.title"
      :to="item.to"
    >
      <v-icon>{{ item.icon }}</v-icon>

      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";

const items = [
  {title: 'Startseite', to: '/administrator', icon: 'mdi-home'},
  {title: 'Benutzer', to: '/administrator/users', icon: 'mdi-account-cog'},
  {title: 'Global', to: '/administrator/settings', icon: 'mdi-cog'},
];

const model = ref(0 as number);
watch(model, (value) => {
  console.log(value);
});
</script>

<style scoped>

</style>
