<template>
  <v-container class="v-col-lg-4 v-col-sm-6">
    <v-card>
      <v-progress-linear indeterminate color="secondary" v-if="isLoading || loginLoading"></v-progress-linear>
      <v-tabs
        v-model="tab"
        :disabled="loginLoading || isLoading"
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
              <login-form :is-loading="loginLoading || isLoading" @login="onLogin"></login-form>
            </v-container>
          </v-window-item>

          <v-window-item value="register">
            <v-container>
              <h1 class="pb-4">Benutzer registrieren</h1>
              <register-form :is-loading="loginLoading || isLoading" @register="onRegistration"></register-form>
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
import {storeToRefs} from "pinia";
import {useGlobalPropertiesStore} from "@/store/GlobalPropertiesStore";

const settingsStore = useSettingsStore();
let allowRegistrationSetting = settingsStore.findSetting("all_reg");
let allowRegistration = ref(allowRegistrationSetting.active);

let tab = ref("login");
let loginLoading = ref(false);

const globalPropertiesStore = useGlobalPropertiesStore();
const { isLoading } = storeToRefs(globalPropertiesStore);

async function onRegistration(registerRequest: RegisterRequest) {
  try {
    loginLoading.value = true;
    await onRegistrationRequest(registerRequest);
    backToLogin();
  } finally {
    loginLoading.value = false;
  }
}

async function onLogin(loginRequest: LoginRequest) {
  loginLoading.value = true;
  await onLoginRequest(loginRequest).then(() => {
    router.push("/");
  }).finally(() => {
    loginLoading.value = false;
  });
}

function backToLogin(): void {
  tab.value = "login";
}

</script>

<style scoped>
</style>
