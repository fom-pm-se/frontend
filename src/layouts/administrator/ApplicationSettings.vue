<template>
  <v-row>
    <v-col v-for="setting in settings" no-gutters>
      <setting-toggle :setting="setting"/>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {useSettingsStore} from "@/store/SettingsStore";
import {ref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import {Alert} from "@/model/store/Alert";
import {SettingsShort} from "@/model/store/Settings";
import SettingToggle from "@/layouts/administrator/elements/SettingToggle.vue";

let isLoading = ref(true);

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
