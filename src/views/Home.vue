<template>
  <alert-wrapper/>
  <v-container>
    <h1>Home!</h1>
    <v-alert variant="tonal" type="info" icon="mdi-bell" v-if="notificationStore.notificationsCount > 0">
      <v-alert-title>Du hast neue Benachrichtigungen</v-alert-title>
      Du hast neue Benachrichtigungen. Klicke hier, um zu deinen Benachrichtigungen zu gelangen.
      <v-divider class="my-4"></v-divider>
      <v-dialog v-model="notificationDialog">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" color="info" variant="text">Benachrichtigung anzeigen</v-btn>
        </template>
        <notification-list/>
      </v-dialog>
    </v-alert>
  </v-container>
</template>

<script lang="ts" setup>
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useNotificationStore} from "@/store/NotificationStore";
import NotificationList from "@/components/notifications/NotificationList.vue";
import {ref} from "vue";
const notificationStore = useNotificationStore();
const notificationDialog = ref(false as boolean);
</script>
