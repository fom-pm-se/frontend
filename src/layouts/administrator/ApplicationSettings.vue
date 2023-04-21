<template>
  <v-row>
    <v-container>
      <h1>Anwendungseinstellungen</h1>
    </v-container>
  </v-row>
  <v-row>
    <v-col v-for="setting in settings" no-gutters :key="setting.technicalName">
      <setting-toggle :setting="setting" @setting-changed="showSnackbar"></setting-toggle>
    </v-col>
  </v-row>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      :close-on-content-click="true"
      :location="!isMobile.xs ? 'bottom left' : 'bottom'"
      timeout="900"
    >
      Gespeichert!
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import {useSettingsStore} from "@/store/SettingsStore";
import {ref} from "vue";
import SettingToggle from "@/layouts/administrator/elements/SettingToggle.vue";
import {useDisplay} from "vuetify";

const isMobile = ref(useDisplay());

let snackbar = ref(false as boolean);

let isLoading = ref(true);

function showSnackbar(success: boolean) {
  snackbar.value = false;
  console.log(snackbar.value);
  if (success) {
    snackbar.value = true;
  }
}

const settingsStore = useSettingsStore();
let settings = ref(settingsStore.settings);

settingsStore.fetchSettingsLong().then(() => {
  isLoading.value = false;
  settings.value = settingsStore.settings;
}).catch(() => {
  isLoading.value = false;
});
</script>

<style scoped>

</style>
