<template>
  <v-container class="v-col-lg-4 v-col-sm-6">
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="primary"
        :disabled="isLoading"
      >
        <v-tab value="login">Einloggen</v-tab>
        <v-tab value="register">Registrieren</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="login">
            <v-container>
              <h1 class="pb-4">Einloggen</h1>
              <login-form @login="handleLoginRequest" :is-loading="isLoading"></login-form>
              <v-alert type="error" class="mb-5 mt-5" v-if="loginError" variant="outlined">
                <v-alert-title>Login fehlgeschlagen</v-alert-title>
                {{ errorMessage }}
              </v-alert>
            </v-container>
          </v-window-item>

          <v-window-item value="register">
            <v-container>
              <h1 class="pb-4">Benutzer registrieren</h1>
              <register-form @register="handleRegisterRequest" :is-loading="isLoading"></register-form>
              <v-alert type="error" class="mb-5 mt-5" v-if="registerError" variant="outlined">
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

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { login, register } from "@/service/LoginService";

export default {
  name: "Login",
  components: {LoginForm, RegisterForm},
  data: () => ({
    tab: null,
    isLoading: false,
    loginError: null,
    registerError: null,
    registerErrorMessage: null,
    errorMessage: null,
    forgotPasswordDialog: false
  }),
  methods: {
    handleLoginRequest(loginRequest) {
      this.isLoading = true;
      login(loginRequest)
        .then(() => {
          this.isLoading = false;
          this.$router.push({name: 'Home'});
        })
        .catch((err) => {
          this.loginError = true;
          if (err.code === 'ERR_NETWORK') {
            this.errorMessage = 'Ein Netzwerkfehler ist aufgetreten. Bitte versuchen Sie es später erneut.';
          } else {
            this.errorMessage = 'Benutzername oder Passwort sind falsch.';
          }
          this.isLoading = false;
        });
    },
    handleRegisterRequest(registerRequest) {
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
}
</script>

<style scoped>
</style>
