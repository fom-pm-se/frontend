<template>
  <v-container class="v-col-lg-4 v-col-sm-6">
    <v-card>
      <v-tabs
        v-model="tab"
        :disabled="isLoading"
        bg-color="primary"
      >
        <v-tab value="login">Einloggen</v-tab>
        <v-tab value="register">Registrieren</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="login">
            <v-container>
              <h1 class="pb-4">Einloggen</h1>
              <login-form :is-loading="isLoading" @login="handleLoginRequest"></login-form>
              <v-alert v-if="loginError" class="mb-5 mt-5" type="error" variant="outlined">
                <v-alert-title>Login fehlgeschlagen</v-alert-title>
                {{ loginErrorMessage }}
              </v-alert>
            </v-container>
          </v-window-item>

          <v-window-item value="register">
            <v-container>
              <h1 class="pb-4">Benutzer registrieren</h1>
              <register-form :is-loading="isLoading" @register="handleRegisterRequest"></register-form>
              <v-alert v-if="registerError" class="mb-5 mt-5" type="error" variant="outlined">
                <v-alert-title>Registrierung fehlgeschlagen</v-alert-title>
                {{ registerErrorMessage }}
              </v-alert>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import {login, register} from "@/service/LoginService";
import {LoginRequest} from "@/model/request/LoginRequest";
import {RegisterRequest} from "@/model/request/RegisterRequest";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Login",
  components: {LoginForm, RegisterForm},
  data() {
    return {
      tab: null,
      isLoading: false,
      loginError: false,
      registerError: false,
      registerErrorMessage: "",
      loginErrorMessage: "",
      forgotPasswordDialog: false
    }
  },
  methods: {
    handleLoginRequest(loginRequest: LoginRequest) {
      this.isLoading = true
      login(loginRequest)
        .then(() => {
          this.isLoading = false;
          this.$router.push({name: 'Home'});
        })
        .catch((err: any) => {
          this.loginError = true;
          if (err.code === 'ERR_NETWORK') {
            this.loginErrorMessage = 'Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
          } else {
            this.loginErrorMessage = 'Benutzername oder Passwort sind falsch.';
          }
          this.isLoading = false;
        });
    },
    handleRegisterRequest(registerRequest: RegisterRequest) {
      console.log(registerRequest)
      this.isLoading = true;
      register(registerRequest)
        .then(() => {
          this.isLoading = false;
          this.$router.push({name: 'Home'});
        })
        .catch((err) => {
          this.registerError = true;
          if (err.code === 'ERR_NETWORK') {
            this.registerErrorMessage = 'Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
          } else {
            this.registerErrorMessage = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
          }
          this.isLoading = false;
        });
    }
  }
});
</script>

<style scoped>
</style>
