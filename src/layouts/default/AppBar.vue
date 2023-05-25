<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    {{ route.meta?.name }}
    <v-spacer></v-spacer>
    <div v-if="isLoading">
      Lade Daten...
      <v-progress-circular indeterminate class="ml-3"></v-progress-circular>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon class="mr-2">
      <v-icon icon="mdi-theme-light-dark" size="x-large" @click="toggleTheme"></v-icon>
    </v-btn>
    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn icon class="mr-2" v-bind="props" :loading="notificationStore.isLoading">
          <v-badge dot color="red" class="mr-2" inline v-if="notificationStore.notificationsCount > 0">
            <v-icon icon="mdi-bell" size="x-large"></v-icon>
          </v-badge>
          <v-icon icon="mdi-bell-outline" size="x-large" v-if="notificationStore.notificationsCount === 0"></v-icon>
        </v-btn>
      </template>
      <NotificationList/>
    </v-menu>
    <v-btn icon @click="logout">
      <v-icon size="x-large">mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    color="primary"
    v-model="drawer"
    :location="isMobile.smAndUp ? 'left' : 'bottom'"
  >
    <v-list dense>
      <v-list-item>
        <v-list-item-title>{{ user.firstname }} {{ user.lastname }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.username }}</v-list-item-subtitle>
      </v-list-item>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        :title="item.title"
        :value="item.title"
        :prepend-icon="item.icon"
        class="my-2"
      >
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
    <v-list v-if="userStore.isAdministrator()">
      <v-list-item
        v-for="item in adminItems"
        :key="item.title"
        link
        :to="item.to"
        :title="item.title"
        :value="item.title"
        :prepend-icon="item.icon"
        class="my-2"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import {useDisplay, useTheme} from "vuetify";
import {ref} from "vue";
import {logout} from "@/service/AuthenticationService";
import {useUserStore} from "@/store/UserStore";
import {storeToRefs} from "pinia";
import {useGlobalPropertiesStore} from "@/store/GlobalPropertiesStore";
import {useRoute} from "vue-router";
import NotificationList from "@/components/notifications/NotificationList.vue";
import {useNotificationStore} from "@/store/NotificationStore";

const globalPropertiesStore = useGlobalPropertiesStore();
const {isLoading} = storeToRefs(globalPropertiesStore);
const notificationStore = useNotificationStore();

const route = useRoute();

const theme = useTheme();
let drawer = ref(false);

const userStore = useUserStore();
let {user} = storeToRefs(userStore);

notificationStore.getNumberOfUnreadNotifications().finally(() => {})

const isMobile = ref(useDisplay());

const items = [
  {title: 'Home', to: '/', icon: 'mdi-home'},
  {title: 'Profile', to: '/profiles', icon: 'mdi-account'},
  {title: 'Partner', to: '/partner', icon: 'mdi-account-group'},
  {title: 'Einstellungen', to: '/settings', icon: 'mdi-cog'},
];

const adminItems = [
  {title: 'Administrator', to: '/administrator', icon: 'mdi-account-cog'},
];

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
