<template>
  <v-row>
    <v-col>
      <v-form
        @submit.prevent
        :model-value="isValid()"
        :disabled="isLoading"
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
              color="primary"
              type="submit"
              aria-label="submit"
              block
              :disabled="!isValid()"
              :loading="$props.isLoading"
              @click="onSubmit()"
            >Einloggen
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'LoginForm',
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
      rules: {
        required: (value) => !!value || 'Pflichtfeld.',
        email: (value) => /.+@.+\..+/.test(value) || 'Bitte gültige E-Mail eingeben.',
        min: (v) => v.length >= 8 || 'Mindestens 8 Zeichen.',
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
}
</script>
