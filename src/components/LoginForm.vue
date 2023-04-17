<template>
  <v-row>
    <v-col>
      <v-form
        @submit.prevent
        :model-value="isValid()"
        :disabled="isLoading as boolean"
      >
        <v-text-field
          v-model="email"
          label="E-Mail"
          aria-label="email"
          placeholder="max.mustermann@firma.de"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Passwort"
          aria-label="password"
          :rules="[rules.required, rules.min]"
          type="password"
        ></v-text-field>
        <v-row class="mt-5">
          <v-col>
            <v-btn
              color="secondary"
              type="submit"
              variant="outlined"
              aria-label="submit"
              :disabled="!isValid()"
              :loading="$props.isLoading as boolean"
              @click="onSubmit()"
              prepend-icon="mdi-login"
            >Einloggen
            </v-btn>
            <v-dialog
              v-model="forgotPasswordDialog"
              max-width="700px"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="secondary"
                  v-bind="props"
                  variant="text"
                >
                  Passwort vergessen?
                </v-btn>
              </template>

              <v-card>
                <v-card-text>
                  <reset-password-form></reset-password-form>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
<script lang="ts">

import ResetPasswordForm from "@/components/ResetPasswordForm.vue";
import {defineComponent} from "vue";
export default defineComponent({
  name: 'LoginForm',
  components: {ResetPasswordForm},
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      forgotPasswordDialog: false,
      rules: {
        required: (value: any) => !!value || 'Pflichtfeld.',
        email: (value: any) => /.+@.+\..+/.test(value) || 'Bitte gültige E-Mail eingeben.',
        min: (v: any) => v.length >= 8 || 'Mindestens 8 Zeichen.',
      }
    }
  },
  methods: {
    isValid() {
      return !!(this.email && /.+@.+\..+/.test(this.email) && this.password && this.password.length >= 8);
    },
    onSubmit() {
      const loginRequest = {
        username: this.email,
        password: this.password
      }
      this.$emit('login', loginRequest);
    }
  }
});
</script>
