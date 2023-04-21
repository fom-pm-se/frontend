<template>
    <v-card>
      <v-card-title>Hallo Admin!</v-card-title>
      <v-card-subtitle>Willkommen im Administratorbereich.</v-card-subtitle>
      <v-card-text>
        <v-btn
          color="secondary"
          @click="show = !show"
          variant="outlined"
          prepend-icon="mdi-menu"
        >Mehr erfahren</v-btn>
      </v-card-text>
      <v-divider></v-divider>
      <v-scale-transition>
        <v-card-text v-show="show">
          <p>
            Hier kannst du die Einstellungen der Anwendung verwalten.
          </p>
          <p>
            Du kannst Benutzer anlegen, löschen und deren Rollen verwalten.
          </p>
          <p>
            Du kannst die Einstellungen der Anwendung verwalten.
          </p>
        </v-card-text>
      </v-scale-transition>
    </v-card>
</template>
<script lang="ts" setup>
  import {ref} from "vue";

  const show = ref(false);
</script>

<style scoped>

</style>
