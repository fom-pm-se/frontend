<template>
  <v-row>
    <v-col>
      <v-form v-model="isFormValid" :disabled="props.isLoading" @submit.prevent>
        <v-alert class="mb-5" type="error" v-if="usernameTaken" variant="outlined">Der Benutzer existiert bereits.</v-alert>
        <v-text-field label="Vorname" v-model="firstname"
          :rules="[rules.required]"></v-text-field>
        <v-text-field label="Nachname" v-model="lastname"
          :rules="[rules.required]"></v-text-field>
        <v-text-field label="E-Mail" v-model="email" v-on:input="validateUsername"
          :rules="[rules.email, rules.required]"></v-text-field>
        <v-text-field label="Passwort" type="password" v-model="password"
          :rules="[rules.min, rules.required, rules.requiresNumber, rules.requiresMixedCase]"></v-text-field>
        <v-text-field label="Passwort wiederholen" type="password" v-model="passwordRepeat"
          :rules="[rules.mustMatchPassword]"></v-text-field>
        <v-btn color="primary" :disabled="!isFormValid" :loading="props.isLoading" @click="onSubmit" type="submit" >Registrieren</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>

import {isUsernameAvailable} from "@/service/AuthenticationService";
import {ref} from "vue";

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['register']);

const isFormValid = ref(false as boolean);
const firstname = ref('' as string);
const lastname = ref('' as string);
const email = ref('' as string);
const password = ref('' as string);
const passwordRepeat = ref('' as string);
const usernameTaken = ref(false as boolean);
const rules = {
  required: (value: any) => !!value || 'Pflichtfeld.',
  email: (value: any) => /.+@.+\..+/.test(value) || 'Bitte gültige E-Mail eingeben.',
  min: (v: any) => v.length >= 8 || 'Mindestens 8 Zeichen.',
  mustMatchPassword: () => password.value === passwordRepeat.value || 'Passwörter stimmen nicht überein.',
  requiresMixedCase: (value: any) => /[A-Z]/.test(value) && /[a-z]/.test(value) || 'Mindestens einen Kleinbuchstaben und einen Großbuchstaben enthalten.',
  requiresNumber: (value: any) => /\d/.test(value) || 'Mindestens eine Zahl enthalten.',
} 

function validateUsername(): void {
  isUsernameAvailable(email.value).then((response) => {
    if (response.data) {
      usernameTaken.value = false;
    } else {
      usernameTaken.value = true;
    }
  });
}

function onSubmit() {
  const registerRequest = {
    firstname: firstname.value,
    lastname: lastname.value,
    username: email.value,
    password: password.value,
  };
  emit('register', registerRequest);
}



</script>

<style scoped>

</style>
