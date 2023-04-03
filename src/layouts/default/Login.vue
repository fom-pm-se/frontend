<template>
  <v-container class="v-col-lg-4 v-col-sm-6">
    <v-card elevation="8">
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
              <v-alert type="error" class="mb-5 mt-5" v-if="loginError">
                <v-alert-title>Login fehlgeschlagen</v-alert-title>
                {{ errorMessage }}
              </v-alert>
            </v-container>
          </v-window-item>

          <v-window-item value="register">
            <h1 class="pb-4">Benutzer registrieren</h1>
            <register-form></register-form>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import { login } from "@/service/LoginService";

export default {
  name: "Login",
  components: {LoginForm, RegisterForm},
  data: () => ({
    tab: null,
    isLoading: false,
    loginError: null,
    errorMessage: null
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
    }
  }
}
</script>

<style scoped>
</style>
