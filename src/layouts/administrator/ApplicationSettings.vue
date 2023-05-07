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
  <snackbar-wrapper></snackbar-wrapper>
</template>

<script lang="ts" setup>
import {useSettingsStore} from "@/store/SettingsStore";
import {ref} from "vue";
import SettingToggle from "@/layouts/administrator/elements/SettingToggle.vue";
import SnackbarWrapper from "@/components/common/SnackbarWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";

const alertStore = useAlertStore();
let isLoading = ref(true);

function showSnackbar(success: boolean) {
  if (success) {
    alertStore.showSnackbarMessage('Einstellungen gespeichert!');
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
