<template>
  <v-container class="v-col-lg-4 v-col-sm-6">
    <v-card>
      <v-tabs
        v-model="tab"
        :disabled="isLoading"
        bg-color="primary"
      >
        <v-tab value="login">Einloggen</v-tab>
        <v-tab value="register" v-if="allowRegistration">Registrieren</v-tab>
      </v-tabs>

      <v-card-text>
        <alert-wrapper/>
        <v-window v-model="tab">
          <v-window-item value="login">
            <v-container>
              <h1 class="pb-4">Einloggen</h1>
              <login-form :is-loading="isLoading" @login="onLogin"></login-form>
            </v-container>
          </v-window-item>

          <v-window-item value="register">
            <v-container>
              <h1 class="pb-4">Benutzer registrieren</h1>
              <register-form :is-loading="isLoading" @register="onRegistration"></register-form>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import RegisterForm from "@/components/RegisterForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {ref} from "vue";
import {RegisterRequest} from "@/model/request/RegisterRequest";
import {onRegistrationRequest} from "@/service/RegistrationService";
import {LoginRequest} from "@/model/request/LoginRequest";
import {onLoginRequest} from "@/service/LoginService";
import router from "@/router";
import {useSettingsStore} from "@/store/SettingsStore";

const settingsStore = useSettingsStore();
let allowRegistrationSetting = settingsStore.findSetting("all_reg");
let allowRegistration = ref(allowRegistrationSetting.active);

let tab = ref("login");
let isLoading = ref(false);

async function onRegistration(registerRequest: RegisterRequest) {
  try {
    isLoading.value = true;
    await onRegistrationRequest(registerRequest);
    backToLogin();
  } finally {
    isLoading.value = false;
  }
}

async function onLogin(loginRequest: LoginRequest) {
  isLoading.value = true;
  await onLoginRequest(loginRequest).then(() => {
    router.push("/");
  }).catch(() => {
  }).finally(() => {
    isLoading.value = false;
  });
}

function backToLogin(): void {
  tab.value = "login";
}

</script>

<style scoped>
</style>
