<template>
  <v-row>
    <v-col v-for="setting in settings" no-gutters>
      <setting-toggle :setting="setting" @setting-changed="showSnackbar"></setting-toggle>
    </v-col>
  </v-row>
  <div class="text-center ma-2">
    <v-snackbar
      v-model="snackbar"
      :close-on-content-click="true"
      location="bottom left"
      timeout="900"
    >
      Gespeichert!

      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import {useSettingsStore} from "@/store/SettingsStore";
import {ref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {SettingsShort} from "@/model/store/Settings";
import SettingToggle from "@/layouts/administrator/elements/SettingToggle.vue";

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
