<template>
  <v-container>
    <h3>Einstellungen</h3>
    <v-container>
      <v-alert type="info" variant="text" border v-if="!settingsActive">Die Einstellungen wurde durch einen Administrator deaktiviert</v-alert>
    </v-container>
    <alert-wrapper/>
    <v-expansion-panels variant="popout" :disabled="!settingsActive" v-model="panels">
      <v-expansion-panel>
        <v-expansion-panel-title>Benutzerdaten</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-form>
            <v-text-field
              v-model="user.username"
              label="Benutzername"
            ></v-text-field>
            <v-text-field
              v-model="user.firstname"
              label="Vorname"
            ></v-text-field>
            <v-text-field
              v-model="user.lastname"
              label="Nachname"
            ></v-text-field>
            <v-btn variant="outlined" color="secondary" prepend-icon="mdi-content-save">Speichern</v-btn>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Erscheinungsbild</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-select :items="appearanceOptions" v-model="selectedAppearance"></v-select>
          <v-btn variant="outlined" prepend-icon="mdi-content-save" color="secondary">Speichern</v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Passwort ändern</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-form :disabled="isPasswordResetLoading">
            <v-text-field label="Altes Passwort" type="password" v-model="changePasswordModel.oldPassword"></v-text-field>
            <v-text-field
              label="Neues Passwort"
              type="password"
              v-model="changePasswordModel.newPassword"
              hint="mindestens 8 Zeichen lang, mindestens eine Zahl und einen Buchstaben"
            ></v-text-field>
            <v-text-field label="Neues Passwort wiederholen" type="password" v-model="changePasswordModel.passwordRepeat"></v-text-field>
            <v-btn variant="outlined" type="button" color="secondary" @click="onChangePassword" :loading="isPasswordResetLoading" prepend-icon="mdi-content-save">speichern</v-btn>
          </v-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel expand-icon="mdi-plus" collapse-icon="mdi-plus">
        <v-expansion-panel-title>Sicherheit</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-btn variant="text" color="warning" @click="disableSecurityForm = !disableSecurityForm" :prepend-icon="disableSecurityForm ? 'mdi-pencil' : 'mdi-lock'">{{ disableSecurityForm ? "Bearbeiten aktivieren" : "Bearbeiten deaktivieren" }}</v-btn>
          <v-divider class="ma-3"></v-divider>
          <v-btn variant="text" color="error" :disabled="disableSecurityForm">
            Benutzer sperren
            <v-dialog
              v-model="lockUserDialog"
              activator="parent"
              width="auto"
            >
              <v-card>
                <v-card-text>
                  <v-alert variant="text" type="error">
                    <v-alert-title class="mb-2">Soll der Benutzer {{ userStore.user.username }} wirklich gesperrt werden?</v-alert-title>
                    Du kannst dich danach nicht mehr mit dem Benutzer anmelden. Nur ein Administrator kann den Benutzer wieder entsperren.
                  </v-alert>
                </v-card-text>
                  <v-btn color="error" @click="lockUser" class="ma-1">Benutzer sperren</v-btn>
              </v-card>
            </v-dialog>
          </v-btn>
          <v-btn variant="text" color="error" :disabled="disableSecurityForm">
            Benutzer löschen
            <v-dialog
              v-model="deleteUserDialog"
              activator="parent"
              width="auto"
            >
              <v-card>
                <v-card-text>
                  <v-alert variant="text" type="error">
                    <v-alert-title class="mb-2">Soll der Benutzer {{ userStore.user.username }} wirklich gelöscht werden?</v-alert-title>
                    Diese Aktion kann nicht wieder rückgängig gemacht werden. Alle Daten des Benutzers werden unwiderruflich gelöscht.
                  </v-alert>
                </v-card-text>
                <v-btn color="error" @click="deleteUserDialog = false" class="ma-1">Benutzer löschen</v-btn>
              </v-card>
            </v-dialog>
          </v-btn>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "@/store/UserStore";
import {useSettingsStore} from "@/store/SettingsStore";
import {changePassword} from "@/service/PasswordService";
import {lockUser} from "@/service/AuthenticationService";
import {ChangePasswordRequest} from "@/model/request/ChangePasswordRequest";
import AlertWrapper from "@/components/common/AlertWrapper.vue";

let selectedAppearance = ref('Automatisch');
let panels = ref([] as string[])

const userStore = useUserStore();
const settingsStore = useSettingsStore();

let user = ref(userStore.user);

let lockUserDialog = ref(false as boolean);
let deleteUserDialog = ref(false as boolean);
let disableSecurityForm = ref(true as boolean);
let isPasswordResetLoading = ref(false as boolean);
let isUserLockingLoading = ref(false as boolean);

const settingsActive = ref(settingsStore.findSetting('all_user_settings').active);

const appearanceOptions = ["Hell", "Automatisch", "Dunkel"];

let changePasswordModel = ref({
  oldPassword: '' as string,
  newPassword: '' as string,
  passwordRepeat: '' as string
});

function onChangePassword() {
  isPasswordResetLoading.value = true;
  changePassword(changePasswordModel.value as ChangePasswordRequest).then(() => {
    panels.value = [];
  }).finally(() => {
    isPasswordResetLoading.value = false;
  });
}

function onLockUser() {
  isUserLockingLoading.value = true;
  lockUser().then(() => {
    panels.value = [];
  }).finally(() => {
    isUserLockingLoading.value = false;
  });
}

</script>

<style scoped>

</style>
