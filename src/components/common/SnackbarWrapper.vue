<template>
  <div class="text-center">
    <v-snackbar
      v-model="alertStore.showSnackbar"
      :location="!isMobile.xs ? 'bottom left' : 'bottom'"
      timeout="1000"
    >
      {{ alertStore.snackbarMessage }}
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {useDisplay} from "vuetify";
import {useAlertStore} from "@/store/AlertStore";

const isMobile = ref(useDisplay());
const alertStore = useAlertStore();

watch(alertStore, () => {});
</script>
