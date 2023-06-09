<template>
  <v-row>
    <v-progress-circular indeterminate class="mx-auto mb-3" v-if="isLoading"></v-progress-circular>
    <v-row class="mt-3">
      <v-card
        v-for="(user) in userList"
        :key="user.username"
        cols="12"
        sm="3"
        width="300"
        class="mx-auto my-2"
        elevation="5"
        :disabled="userStore.user.username === user.username"
      >
        <v-alert icon="mdi-lock" v-if="!user.enabled" type="warning"> Gesperrt</v-alert>
        <v-alert icon="mdi-account-check" v-else> {{ formatRole(user.role) }}</v-alert>
        <v-card-title>
          {{ user.firstname }} {{ user.lastname }}
        </v-card-title>
        <v-card-subtitle>{{ user.username }}</v-card-subtitle>
        <v-card-actions>
          <v-btn icon="mdi-pencil" @click="openEditDialog(user)"></v-btn>
          <v-btn icon="mdi-form-textbox-password" v-if="user.role === 'USER'"></v-btn>
          <v-btn icon="mdi-lock" v-if="user.enabled" color="error" @click="onLockUser(user.username)"></v-btn>
          <v-btn icon="mdi-lock-open" v-else color="secondary" @click="onLockUser(user.username)"></v-btn>
          <v-btn icon="mdi-delete" color="error"></v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-dialog v-model="editDialog" :width="isMobile.xs ? '100%' : '500px'">
      <v-card>
        <v-card-title>
          <h2>Bearbeiten</h2>
        </v-card-title>
        <v-card-text>
          <user-data-form :user="{...userToEdit} as User"
                          @user-changed="onUserChanged"/>
        </v-card-text>
      </v-card>
    </v-dialog>
    <snackbar-wrapper/>
  </v-row>
</template>

<script lang="ts" setup>
import {useUserListStore} from "@/store/UserListStore";
import {ref} from "vue";
import {useUserStore} from "@/store/UserStore";
import {lockUserAdmin} from "@/service/AuthenticationService";
import UserDataForm from "@/layouts/settings/UserDataForm.vue";
import {User} from "@/model/store/User";
import {useDisplay} from "vuetify";
import SnackbarWrapper from "@/components/common/SnackbarWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";

let userToEdit = {} as User;


const userStore = useUserStore();
const alertStore = useAlertStore();

const isMobile = ref(useDisplay())

const editDialog = ref(false as boolean);

function openEditDialog(user: User) {
  editDialog.value = true;
  userToEdit = user;
}

let userList = ref([] as User[]);
const userListStore = useUserListStore();
userListStore.fetchUserList().then(() => {
  userList.value = userListStore.userList;
});

let isLoading = ref(true);
onUserLoad().finally(() => {
  isLoading.value = false
})

async function onUserLoad() {
  await userListStore.fetchUserList();
  userList.value = userListStore.userList;
}

function formatRole(role: string) {
  return role === 'ADMIN' ? 'Administrator' : 'Standardbenutzer';
}

function onUserChanged(success: boolean) {
  if (success) {
    onUserLoad();
    editDialog.value = false;
    alertStore.showSnackbarMessage('Benutzer gespeichert!');
  }
}

function onLockUser(username: string) {
  lockUserAdmin(username).then(() => {
    onUserLoad();
    alertStore.showSnackbarMessage('Benutzer gesperrt/entsperrt!')
  });
}
</script>

<style scoped>

</style>
