<template>
  <v-card
    :color="setting.active ? 'secondary' : ''"
    :key="setting.technicalName"
    cols="12"
    sm="4"
    max-width="450"
    class="mx-auto my-2"
    elevation="5"
    :loading="isLoading"
    :disabled="isLoading"
  >
    <v-card-title>
      {{ setting.name }}
    </v-card-title>
    <v-card-subtitle>{{ setting.description }}</v-card-subtitle>
    <v-card-actions>
      <v-btn
        block
        @click="saveSetting(setting)"
        variant="outlined"
      >{{ setting.active ? 'Deaktivieren' : 'Aktivieren' }}
      </v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn variant="text" :prepend-icon="dialogActive ? 'mdi-arrow-up' : 'mdi-arrow-down'"
             @click="dialogActive = !dialogActive">
        {{ dialogActive ? 'Schließen' : 'Mehr' }}
      </v-btn>
    </v-card-actions>
    <v-slide-x-transition>
      <v-card-text v-show="dialogActive">
        <h3>{{ setting.technicalName }}</h3>
        <p>{{ setting.description }}</p>
      </v-card-text>
    </v-slide-x-transition>
  </v-card>
</template>

<script lang="ts" setup>
import {Settings, SettingsShort} from "@/model/store/Settings";
import {ref} from "vue";
import {useSettingsStore} from "@/store/SettingsStore";

let isLoading = ref(false as boolean);
const settingsStore = useSettingsStore();
const dialogActive = ref(false as boolean);
const emits = defineEmits(['setting-changed']);

defineProps<{
  setting: Settings;
}>();

function saveSetting(setting: SettingsShort) {
  isLoading.value = true;
  setting.active = !setting.active;
  settingsStore.saveSetting(setting)
    .then(() => {
      emits('setting-changed', true);
    })
    .catch(() => {
      emits('setting-changed', false);
    })
    .finally(() => {
      isLoading.value = false;
    });
}
</script>

<style scoped>

</style>
