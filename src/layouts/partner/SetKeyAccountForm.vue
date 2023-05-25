<template>
  <v-form disabled>
    <v-alert class="my-5" color="info" variant="tonal" type="info">Diese Funktion steht noch nicht zur Verfügung</v-alert>
    <v-autocomplete label="Keyaccount auswählen" no-data-text="Benutzer konnten nicht geladen werden"></v-autocomplete>
    <v-btn prepend-icon="mdi-account" color="secondary" variant="outlined" disabled>Speichern</v-btn>
  </v-form>
</template>
<script lang="ts" setup>
</script>
