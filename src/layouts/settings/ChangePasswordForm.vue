<template>
  <v-form :disabled="isPasswordResetLoading" ref="passwordFormRef" @submit.prevent>
    <v-text-field label="Altes Passwort" type="password" v-model="props.oldPassword"
                  :rules="ENTER_PASSWORD_RULESET"></v-text-field>
    <v-text-field
      label="Neues Passwort"
      type="password"
      v-model="props.newPassword"
      :rules="NEW_PASSWORD_RULESET"
      hint="mindestens 8 Zeichen lang, mindestens eine Zahl und einen Buchstaben"
    ></v-text-field>
    <v-text-field label="Neues Passwort wiederholen" type="password"
                  v-model="props.passwordRepeat" :rules="passwordConfirmRules"></v-text-field>
    <v-btn variant="outlined" type="button" color="secondary" @click="onChangePassword"
           :loading="isPasswordResetLoading" prepend-icon="mdi-content-save">speichern
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {changePassword} from "@/service/PasswordService";
import {ChangePasswordRequest} from "@/model/request/ChangePasswordRequest";
import {ENTER_PASSWORD_RULESET, NEW_PASSWORD_RULESET} from "@/model/validation/ValidationRulesets";
import {PASSWORD_CONFIRM} from "@/model/validation/FieldValidation";

const passwordFormRef = ref(undefined as any);

const emits = defineEmits(['password-changed']);
const props = ref({} as ChangePasswordRequest);

let isPasswordResetLoading = ref(false as boolean);

const passwordConfirmRules = [
  (v: string) => PASSWORD_CONFIRM(v, props.value.newPassword)
];

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
