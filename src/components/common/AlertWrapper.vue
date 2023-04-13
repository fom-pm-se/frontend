<template>
  <v-container v-for="alert in alerts" :key="alert.title">
    <v-alert :type="alert.type" variant="tonal" density="compact" border>
      <v-alert-title>{{ alert.title }}</v-alert-title>
      {{ alert.message }}
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
  import {useAlertStore} from "@/store/AlertStore";
  import {Alert} from "@/model/store/Alert";

  const alertStore = useAlertStore();
  const alerts: Alert[] = alertStore.alerts;

</script>
