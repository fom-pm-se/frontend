<template>
  <v-card width="300">
    <v-card-title>Benachrichtigungen</v-card-title>
    <v-card-subtitle>Du hast {{ notificationStore.notificationsCount }} neue Benachrichtigungen</v-card-subtitle>
    <v-card-actions v-if="notificationStore.notificationsCount > 0">
      <v-btn color="secondary" text prepend-icon="mdi-eye-outline">Alle als gelesen markieren</v-btn>
    </v-card-actions>
    <v-divider class="mt-3" v-if="notificationStore.numberOfUnreadNotifications > 0"></v-divider>
    <v-list>
      <v-scroll-x-reverse-transition v-for="notification in notificationStore.notifications" :key="notification.id">
        <notification-item :notification="notification as Notification"></notification-item>
      </v-scroll-x-reverse-transition>
    </v-list>
  </v-card>
</template>
<script lang="ts" setup>
import NotificationItem from "@/components/notifications/NotificationItem.vue";
import {Notification} from "@/model/store/Notification";
import {useNotificationStore} from "@/store/NotificationStore";

const notificationStore = useNotificationStore();
notificationStore.fetchNotifications();

</script>
