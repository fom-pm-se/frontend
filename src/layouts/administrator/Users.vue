<template>
  <v-container>
    <alert-wrapper></alert-wrapper>
    <v-card>
      <v-card-title>Benutzereinstellungen</v-card-title>
      <v-card-text>
        <v-progress-linear
          v-if="isLoading"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-table>
          <thead>
          <tr>
            <th class="text-left">Benutzername</th>
            <th class="text-left">Vorname</th>
            <th class="text-left">Nachname</th>
            <th class="text-left">Rolle</th>
            <th class="text-left">Aktionen</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user) in userList" :key="user.username">
            <td>{{ user.username }}</td>
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ formatRole(user.role) }}</td>
            <td>
              <v-btn variant="text" icon="mdi-pencil" color="secondary" :disabled="isCurrentUser(user.username)"></v-btn>
              <v-btn variant="text" icon="mdi-lock" color="error" :disabled="isCurrentUser(user.username)"></v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-actions>
        <v-btn icon="mdi-plus" color="primary" variant="flat"></v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import {useUserListStore} from "@/store/UserListStore";
import {ref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useUserStore} from "@/store/UserStore";


const userListStore = useUserListStore();
let userList = ref(userListStore.userList);

let isLoading = ref(true);
onUserLoad().finally(() => {
  isLoading.value = false
})

const userStore = useUserStore();
const user = ref(userStore.user);

function isCurrentUser(username: string) {
  return user.value.username === username;
}

async function onUserLoad() {
  await userListStore.fetchUserList();
  userList.value = userListStore.userList;
}

function formatRole(role: string) {
  return role === 'ADMIN' ? 'Administrator' : 'Standardbenutzer';
}

</script>

<style scoped>

</style>
