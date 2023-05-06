<script setup lang="ts">

</script>

<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-12"
    elevation="0"
    rounded
    max-width="800"
    width="100%"
  >
    <div>
      <h2 class="text-h4 font-weight-medium mb-4">Keine Partner vorhanden...</h2>

      <div class="text-h5 font-weight-light mb-2">
        Es wurden noch keine Partner angelegt. Klicke auf "Partner hinzufügen" um zu beginnen
      </div>
      <v-btn variant="tonal" prepend-icon="mdi-vector-square-plus" color="secondary" class="ma-3">Partner hinzufügen
      </v-btn>
      <v-btn icon="mdi-information" variant="text" color="secondary"></v-btn>
    </div>
  </v-sheet>
</template>
