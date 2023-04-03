<template>
  <v-container>
    <register-form />
  </v-container>
</template>

<script lang="ts">
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "Login",
  components: {RegisterForm}
}
</script>
