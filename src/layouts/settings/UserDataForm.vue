<template>
  <v-form :disabled="isChangeUserDialogLoading">
    <v-text-field
      v-model="user.username"
      label="Benutzername"
      readonly
      variant="plain"
      hint="Der Benutzername kann nicht geändert werden."
    ></v-text-field>
    <v-text-field
      v-model="user.firstname"
      :rules="REQUIRED_RULESET"
      label="Vorname"
    ></v-text-field>
    <v-text-field
      v-model="user.lastname"
      :rules="REQUIRED_RULESET"
      label="Nachname"
    ></v-text-field>
    <v-btn :loading="isChangeUserDialogLoading" variant="outlined" color="secondary" prepend-icon="mdi-content-save" @click="onChangeUserSubmit">Speichern</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
import {User} from "@/model/store/User";
import {useUserStore} from "@/store/UserStore";
import {REQUIRED_RULESET} from "@/model/validation/ValidationRulesets";

let isChangeUserDialogLoading = ref(false as boolean);

const userStore = useUserStore();
const props = defineProps<{ user: User }>();
let user = ref(props.user)
const emits = defineEmits(['user-changed']);
let userFormModified = ref(false as boolean);

watch(props.user, () => {
  userFormModified.value = true;
});

function onChangeUserSubmit() {
  isChangeUserDialogLoading.value = true;
  userStore.updateUser(user.value as User).then(() => {
    emits('user-changed', true);
    userFormModified.value = false;
    user = ref({...props.user})
  }).catch(() => {
    emits('user-changed', false);
  }).finally(() => {
    isChangeUserDialogLoading.value = false;
  });
}
</script>

<style scoped>

</style>
