<template>
    <v-card elevation="4">
      <v-card-title>Termine</v-card-title>
      <alert-wrapper/>
    <v-card-actions>
      <v-btn color="secondary" prepend-icon="mdi-plus" variant="tonal" @click="showCreateNoteDialog = true">Termin
        hinzufügen
      </v-btn>
    </v-card-actions>

    <v-dialog v-model="showCreateNoteDialog" width="500">
      <v-container>
        <create-appointment-form @success="showCreateNoteDialog = false"></create-appointment-form>
      </v-container>
    </v-dialog>

    </v-card>
    <snackbar-wrapper/>
  </template>

<script lang="ts" setup>
import { ref } from 'vue';
import CreateAppointmentForm from '../../layouts/appointment/CreateAppointmentForm.vue';

const showCreateNoteDialog = ref(false as boolean);

const notes = {};
const partner = {};

</script>