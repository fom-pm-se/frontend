<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form validate-on="blur">
          <v-text-field
            v-model="firstName"
            label="Vorname"
            aria-label="firstname"
            placeholder="Max"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Nachname"
            aria-label="lastname"
            placeholder="Mustermann"
            :rules="[rules.required]"
          ></v-text-field>
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
          <v-text-field
            v-model="passwordConfirm"
            label="Passwort bestätigen"
            aria-label="passwordConfirm"
            :rules="[rules.min, rules.sameAsPassword]"
            type="password"
          ></v-text-field>
          <v-checkbox
            v-model="terms"
            label="Ich habe die AGB gelesen und akzeptiere diese."
            aria-label="terms"
            :rules="[rules.requiredCheckBox]"
          ></v-checkbox>
          <v-row class="mt-5">
            <v-col>
              <v-btn
                color="primary"
                type="submit"
                aria-label="submit"
                block
                :disabled="!valid"
              >Registrieren</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      terms: false,
      rules: {
        required: (value) => !!value || 'Pflichtfeld.',
        requiredCheckBox: (value) => !!value || 'Bitte bestätigen.',
        email: (value) => /.+@.+\..+/.test(value) || 'Bitte gültige E-Mail eingeben.',
        min: (v) => v.length >= 8 || 'Mindestens 8 Zeichen.',
        sameAsPassword: (value) => value === this.password || 'Passwörter stimmen nicht überein.'
      }
    }
  },
  methods: {
    validateForm() {
      this.valid = !!(this.firstName && this.lastName && this.email && this.password && this.passwordConfirm && this.terms);
    }
  }
}
</script>

<style scoped>

</style>
