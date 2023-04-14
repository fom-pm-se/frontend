<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleTheme">
      <v-icon>{{ theme.global.current.value.dark ? 'mdi-lightbulb-on' : 'mdi-lightbulb' }}</v-icon>
    </v-btn>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer
    color="primary"
    v-model="drawer"
    :location="isMobile.smAndUp ? 'left' : 'bottom'"
  >
    <v-container fluid class="text-center" v-if="isLoading">
      <v-progress-circular indeterminate :size="60"></v-progress-circular>
    </v-container>
    <v-list dense v-if="!isLoading">
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
import {useTheme, useDisplay} from "vuetify";
import {ref} from "vue";
import {logout} from "@/service/AuthenticationService";
import {useUserStore} from "@/store/UserStore";

const theme = useTheme();
let drawer = ref(false);

const userStore = useUserStore();
let user = ref(userStore.user);
let isLoading = ref(false);

const isMobile = ref(useDisplay());

const items = [
  {title: 'Home', to: '/', icon: 'mdi-home'},
  {title: 'Profile', to: '/profiles', icon: 'mdi-account'},
  {title: 'Einstellungen', to: '/settings', icon: 'mdi-cog'},
];

const adminItems = [
  {title: 'Administrator', to: '/administrator', icon: 'mdi-account-cog'},
];

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
}
</script>
