<template>
  <alert-wrapper></alert-wrapper>
  <v-container>
    <h1>Hello {{user.firstname}} {{user.lastname}}</h1>
    <h2>Du bist: {{ user.role }} - Deine Rolle in unserem System</h2>
    <h3>{{ user.username }}</h3>
  </v-container>
</template>

<script lang="ts" setup>

import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useTokenStore} from "@/store/TokenStore";
import {useUserStore} from "@/store/UserStore";
import router from "@/router";
import {ref} from "vue";

const tokenStore = useTokenStore();
const userStore = useUserStore();
userStore.fetchUser();
if (!userStore.isUserLoggedIn || !userStore.isUserLoaded || !tokenStore.token) {
  router.push('/login')
}
const user = ref(userStore.user);
</script>
