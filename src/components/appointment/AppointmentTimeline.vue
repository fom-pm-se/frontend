<template>
    <v-card elevation="4">
      <v-card-title>Termine</v-card-title>
      <alert-wrapper/>
    <v-card-actions>
      <v-btn color="secondary" prepend-icon="mdi-plus" variant="tonal" @click=showDialog>Termin
        hinzufügen
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="showCreateAppointmentDialog" :width="returnwidth">
      <v-container>
        <create-appointment-form @success=hideDialog></create-appointment-form>
      </v-container>
    </v-dialog>
    </v-card>
    <snackbar-wrapper/>
  </template>

<script lang="ts" setup>
import { ref } from 'vue';
import CreateAppointmentForm from '../../layouts/appointment/CreateAppointmentForm.vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const showCreateAppointmentDialog = ref(false as boolean);

function hideDialog(){
  showCreateAppointmentDialog.value = false;
}

function showDialog(){
  showCreateAppointmentDialog.value = true;
}

function returnwidth(){
  const {name} = useDisplay();

  switch (name.value){
    case 'xs': return 250;
    case 'sm': return 400;
    case 'md': return 500;
    case 'lg': return 600; 
    case 'xl': return 800;  
    default: return 500;
  }
}

</script>