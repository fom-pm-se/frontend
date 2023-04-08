<template>
  <v-row>
    <v-col>
      <v-form :disabled="isLoading" @submit.prevent>
        <v-alert class="mb-5" type="error" v-if="usernameTaken" variant="outlined">Der Benutzer existiert bereits.</v-alert>
        <v-text-field label="Vorname" v-model="firstname" :rules="[rules.required]"></v-text-field>
        <v-text-field label="Nachname" v-model="lastname" :rules="[rules.required]"></v-text-field>
        <v-text-field label="E-Mail" v-model="email" v-on:input="validateUsername" :rules="[rules.email, rules.required]"></v-text-field>
        <v-text-field label="Passwort" type="password" v-model="password" :rules="[rules.min, rules.required]"></v-text-field>
        <v-text-field label="Passwort wiederholen" type="password" v-model="passwordRepeat" :rules="[rules.mustMatchPassword]"></v-text-field>
        <v-btn color="primary" :disabled="usernameTaken || isLoading" :loading="isLoading" @click="onSubmit" type="submit">Registrieren</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import {isUsernameAvailable} from "@/service/AuthenticationService";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'RegisterForm',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordRepeat: '',
      usernameTaken: false,
      rules: {
        required: (value: any) => !!value || 'Pflichtfeld.',
        email: (value: any) => /.+@.+\..+/.test(value) || 'Bitte gültige E-Mail eingeben.',
        min: (v: any) => v.length >= 8 || 'Mindestens 8 Zeichen.',
        mustMatchPassword: () => this.password === this.passwordRepeat || 'Passwörter stimmen nicht überein.',
      }
    }
  },
  methods: {
    validateUsername() {
      isUsernameAvailable(this.email).then((response) => {
        if (response.data) {
          this.usernameTaken = false;
        } else {
          this.usernameTaken = true;
        }
      });
    },
    onSubmit() {
      const registerRequest = {
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.email,
        password: this.password,
      };
      console.log('registerRequest', registerRequest);
      this.$emit('register', registerRequest);
    }
  }
});
</script>

<style scoped>

</style>
