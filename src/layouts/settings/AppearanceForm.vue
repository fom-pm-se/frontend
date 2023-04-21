<template>
  <v-select :items="appearanceOptions" v-model="selectedAppearance"></v-select>
  <v-btn variant="outlined" prepend-icon="mdi-content-save" color="secondary">Speichern</v-btn>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const appearanceOptions = ["Hell", "Automatisch", "Dunkel"];
let selectedAppearance = ref('Automatisch');

</script>

<style scoped>

</style>
