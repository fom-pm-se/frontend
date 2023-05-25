<template>
  <v-list-item v-show="!notification?.read" width="300" class="my-4">
    <v-list-item-title>{{ notification.title }}</v-list-item-title>
    <v-expand-transition>
      <v-card variant="tonal" v-show="details" class="my-2">
        <v-card-text>{{ notification.subtitle }}</v-card-text>
      </v-card>
    </v-expand-transition>
    <v-btn variant="text" color="info" icon
           v-if="notification?.url" :to="notification.url">
      <v-icon>mdi-information-outline</v-icon>
      <v-tooltip
        activator="parent"
        location="top"
      >
        Zur Seite
      </v-tooltip>
    </v-btn>
    <v-btn variant="text" color="secondary" icon @click="markAsRead" :loading="isLoading">
      <v-icon>mdi-eye-outline</v-icon>
      <v-tooltip
        activator="parent"
        location="top"
      >
        Als gelesen markieren
      </v-tooltip>
    </v-btn>
    <v-btn :icon="details ? 'mdi-chevron-up' : 'mdi-chevron-down'" variant="text" color="secondary"
           @click="details = !details"></v-btn>
  </v-list-item>
</template>
<script lang="ts" setup>
import {PropType, Ref, ref} from "vue";
import {Notification} from "@/model/store/Notification";
import {useNotificationStore} from "@/store/NotificationStore";

const isLoading = ref(false);
const details = ref(false);

const notificationStore = useNotificationStore();

const props = defineProps({
  notification: {
    type: Object as PropType<Notification>,
    required: true
  }
});

const notification: Ref<Notification> = ref(props.notification);

function markAsRead() {
  isLoading.value = true;
  notificationStore.setNotificationRead(props.notification.id).then((newValue: boolean) => {
    notification.value.read = newValue;
    isLoading.value = false;
  }).finally(() => {
    notificationStore.getNumberOfUnreadNotifications();
  });
}
</script>
