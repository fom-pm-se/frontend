<template>
  <h2 class="mb-5">Kennwort zurücksetzen</h2>
  <p class="mt-5 mb-5">Bitte gebe hier die E-Mail-Adresse des Accounts ein, dessen Kennwort du zurücksetzen möchtest</p>
  <v-form :disabled="submitted">
    <v-text-field
      v-model="email"
      label="E-Mail"
      aria-label="email"
      :rules="[rules.required, rules.email]"
    ></v-text-field>
    <v-alert type="warning" variant="outlined" v-if="submitted">
      Diese Funktion existiert noch nicht, da wir zu arm sind uns einen
      Mailserver zu leisten :(
    </v-alert>
    <v-row class="mt-5">
      <v-col>
        <v-btn
          color="primary"
          aria-label="submit"
          @click="onSubmit()"
          :disabled="submitted || !isValid()"
        >Passwort zurücksetzen
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "ResetPasswordForm",
  data() {
    return {
      email: "",
      submitted: false,
      rules: {
        required: (value: any) => !!value || "Pflichtfeld.",
        email: (value: any) =>
          /.+@.+\..+/.test(value) || "Bitte gültige E-Mail eingeben.",
      },
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
    },
    isValid() {
      return this.email !== "" && /.+@.+\..+/.test(this.email);
    },
  },
});
</script>
<style scoped>

</style>
