<template>
  <v-row>
    <v-progress-circular indeterminate class="mx-auto mb-3" v-if="isLoading"></v-progress-circular>
    <v-row>
      <v-card
        v-for="(user) in userList"
        :key="user"
        cols="12"
        sm="3"
        width="300"
        class="mx-auto my-2"
        elevation="5"
      >
        <v-alert icon="mdi-lock" v-if="!user.enabled" type="warning"> Gesperrt</v-alert>
        <v-alert icon="mdi-account-check" v-else> {{ formatRole(user.role) }}</v-alert>
        <v-card-title>
          {{ user.firstname }} {{ user.lastname }}
        </v-card-title>
        <v-card-subtitle>{{ user.username }}</v-card-subtitle>
        <v-card rounded="0" elevation="0">
          <v-card-actions>
            <v-btn icon="mdi-pencil" @click="openEditDialog(user)"></v-btn>
            <v-btn icon="mdi-lock" v-if="user.enabled" color="error" @click="onLockUser(user.username)"></v-btn>
            <v-btn icon="mdi-lock-open" v-else color="secondary" @click="onLockUser(user.username)"></v-btn>
            <v-btn icon="mdi-delete" color="error"></v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-row>
    <v-dialog v-model="editDialog">
      <v-card>
        <alert-wrapper/>
        <v-card-title>
          <h2>Bearbeiten</h2>
        </v-card-title>
        <v-card-text>
          <user-data-form :user="{...userToEdit} as User"
                          @user-changed="onUserChanged"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts" setup>
import {useUserListStore} from "@/store/UserListStore";
import {ref, unref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useUserStore} from "@/store/UserStore";
import {RegisterRequest} from "@/model/request/RegisterRequest";
import {registerUser} from "@/service/RegistrationService";
import {lockUserAdmin} from "@/service/AuthenticationService";
import UserDataForm from "@/layouts/settings/UserDataForm.vue";
import {User} from "@/model/store/User";

let userToEdit = {} as User;

const activeInformationDialog = ref(undefined as number | undefined);

const userStore = useUserStore();
const user = ref(userStore.user);

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

const registerUserDialog = ref(false as boolean);

let isLoading = ref(true);
onUserLoad().finally(() => {
  isLoading.value = false
})

function toggleDialog(index: number) {
  if (activeInformationDialog.value === index) {
    activeInformationDialog.value = undefined;
  } else {
    activeInformationDialog.value = index;
  }
}

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
  }
}

async function onRegistration(registerRequest: RegisterRequest) {
  try {
    isLoading.value = true;
    await registerUser(registerRequest);
    registerUserDialog.value = false;
    await onUserLoad();
  } finally {
    isLoading.value = false;
  }
}

function onLockUser(username: string) {
  lockUserAdmin(username).then(() => {
    onUserLoad();
  });
}
</script>

<style scoped>

</style>
