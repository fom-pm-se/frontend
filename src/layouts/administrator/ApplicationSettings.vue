<template>
  <v-container>
    <v-card flat>
      <v-card-title>
        Globale Einstellungen
      </v-card-title>
      <alert-wrapper/>
      <v-card-text>
        <v-progress-linear
          v-if="isLoading"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-table v-if="!isLoading">
          <thead>
          <tr>
            <th>Name</th>
            <th>Beschreibung</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="setting in settings" :key="setting.technicalName">
            <td>{{ setting.name }}</td>
            <td>{{ setting.description }}</td>
            <td>
              <v-switch
                v-model="setting.active"
                hide-details
                color="secondary"
              ></v-switch>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="secondary"
          :disabled="isLoading"
          @click="saveSettings"
          prepend-icon="mdi-content-save"
          variant="outlined"
        >
          Speichern
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useSettingsStore} from "@/store/SettingsStore";
import {ref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";

let isLoading = ref(true);

const alertStore = useAlertStore();

const settingsStore = useSettingsStore();
let settings = ref(settingsStore.settings);
settingsStore.fetchSettingsLong().then(() => {
  isLoading.value = false;
  settings.value = settingsStore.settings;
}).catch(() => {
  isLoading.value = false;
});

function saveSettings() {
  isLoading.value = true;
  settingsStore.saveSettings(settings.value).then(() => {
    isLoading.value = false;
    const alert: Alert = {
      title: "Einstellungen aktualisiert",
      message: "Einstellungen wurden erfolgreich gespeichert.",
      type: "success",
    };
    alertStore.setAlert(alert);
  }).catch(() => {
    const alert: Alert = {
      title: "Einstellungen konnten nicht aktualisiert werden",
      message: "Einstellungen konnten nicht aktualisiert werden.",
      type: "error",
    };
    alertStore.setAlert(alert);
    isLoading.value = false;
  });
}

</script>

<style scoped>

</style>
