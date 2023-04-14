<template>
  <v-card>
  </v-card>
</template>

<script lang="ts" setup>
import {User} from "@/model/store/User";

const props = defineProps<{
  user: User;
}>();

let userToEdit = props.user;
</script>

<style scoped>

</style>
