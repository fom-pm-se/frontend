<template>
  <v-list-item v-show="!notification?.read" width="300">
    <v-list-item-title>{{ notification.title }}</v-list-item-title>
    <v-list-item-subtitle>{{ notification.subtitle }}</v-list-item-subtitle>
    <v-btn variant="text" color="secondary" prepend-icon="mdi-information-outline" class="mt-3"
           v-if="notification?.url" :to="notification.url">Mehr
    </v-btn>
    <v-btn variant="text" color="secondary" prepend-icon="mdi-eye-outline" class="mt-3" @click="markAsRead" :loading="isLoading">Gelesen
    </v-btn>
  </v-list-item>
</template>
<script lang="ts" setup>
import {PropType, Ref, ref} from "vue";
import {Notification} from "@/model/store/Notification";
import {useNotificationStore} from "@/store/NotificationStore";

const isLoading = ref(false);

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
