<template>
  <v-container>
    <h3>Einstellungen</h3>
    <v-container>
      <v-alert type="info" variant="text" border v-if="!settingsActive">Die Einstellungen wurde durch einen
        Administrator deaktiviert
      </v-alert>
    </v-container>
    <alert-wrapper/>
    <v-expansion-panels variant="popout" :disabled="!settingsActive" v-model="panels">
      <v-expansion-panel>
        <v-expansion-panel-title>Benutzerdaten</v-expansion-panel-title>
        <v-expansion-panel-text>
          <user-data-form @user-changed="onSuccess" :user="user"/>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Erscheinungsbild</v-expansion-panel-title>
        <v-expansion-panel-text>
          <appearance-form/>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Passwort ändern</v-expansion-panel-title>
        <v-expansion-panel-text>
          <change-password-form @password-changed="onSuccess"></change-password-form>
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel expand-icon="mdi-plus" collapse-icon="mdi-plus">
        <v-expansion-panel-title>Sicherheit</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-btn variant="text" color="warning" @click="disableSecurityForm = !disableSecurityForm"
                 :prepend-icon="disableSecurityForm ? 'mdi-pencil' : 'mdi-lock'">
            {{ disableSecurityForm ? "Bearbeiten aktivieren" : "Bearbeiten deaktivieren" }}
          </v-btn>
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
                    <v-alert-title class="mb-2">Soll der Benutzer {{ userStore.user.username }} wirklich gesperrt
                      werden?
                    </v-alert-title>
                    Du kannst dich danach nicht mehr mit dem Benutzer anmelden. Nur ein Administrator kann den Benutzer
                    wieder entsperren.
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
                    <v-alert-title class="mb-2">Soll der Benutzer {{ userStore.user.username }} wirklich gelöscht
                      werden?
                    </v-alert-title>
                    Diese Aktion kann nicht wieder rückgängig gemacht werden. Alle Daten des Benutzers werden
                    unwiderruflich gelöscht.
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
import {lockUser} from "@/service/AuthenticationService";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import AppearanceForm from "@/layouts/settings/AppearanceForm.vue";
import ChangePasswordForm from "@/layouts/settings/ChangePasswordForm.vue";
import UserDataForm from "@/layouts/settings/UserDataForm.vue";

let panels = ref([] as string[])

const userStore = useUserStore();
const settingsStore = useSettingsStore();

const user = ref(userStore.getCopyOfUser());

let lockUserDialog = ref(false as boolean);
let deleteUserDialog = ref(false as boolean);
let disableSecurityForm = ref(true as boolean);

const settingsActive = ref(settingsStore.findSetting('all_user_settings').active);
function onSuccess(value: boolean) {
  if (value) {
    closePanels();
  }
}

function closePanels() {
  panels.value = [];
}

</script>

<style scoped>

</style>
