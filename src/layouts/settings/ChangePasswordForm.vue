<template>
  <v-form :disabled="isPasswordResetLoading">
    <v-text-field label="Altes Passwort" type="password" v-model="props.oldPassword"></v-text-field>
    <v-text-field
      label="Neues Passwort"
      type="password"
      v-model="props.newPassword"
      hint="mindestens 8 Zeichen lang, mindestens eine Zahl und einen Buchstaben"
    ></v-text-field>
    <v-text-field label="Neues Passwort wiederholen" type="password"
                  v-model="props.passwordRepeat"></v-text-field>
    <v-btn variant="outlined" type="button" color="secondary" @click="onChangePassword"
           :loading="isPasswordResetLoading" prepend-icon="mdi-content-save">speichern
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {changePassword} from "@/service/PasswordService";
import {ChangePasswordRequest} from "@/model/request/ChangePasswordRequest";
import {defineEmits} from "vue";

const emits = defineEmits(['password-changed']);
const props = ref({} as ChangePasswordRequest);

let isPasswordResetLoading = ref(false as boolean);

function onChangePassword() {
  isPasswordResetLoading.value = true;
  changePassword(props.value as ChangePasswordRequest)
    .then(() => {
      emits('password-changed', true);
    }).catch(() => {
    emits('password-changed', false);
  })
    .finally(() => {
      isPasswordResetLoading.value = false;
    });
}

</script>

<style scoped>

</style>
