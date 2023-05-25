<template>
  <v-card elevation="6">
    <v-card-title>{{ partner.name }}
    </v-card-title>
    <v-card-text><h4>Art: {{ partner.type }}</h4></v-card-text>
    <v-card-text>
      <v-text-field label="Adresse" readonly variant="plain" :model-value="partner.address"></v-text-field>
      <v-text-field label="Telefonnummer" readonly variant="plain" :model-value="partner.phoneNumber"></v-text-field>
      <v-btn :prepend-icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'" variant="text" color="secondary" @click="showDetails = !showDetails">Änderungsdetails</v-btn>
      <v-btn color="secondary" variant="outlined" prepend-icon="mdi-arrow-expand" @click="router.push('/partner/' + partner.id)" >Details anzeigen</v-btn>
      <v-btn color="error" icon="mdi-delete" variant="text"></v-btn>
    </v-card-text>
    <v-expand-transition>
      <v-card-text v-show="showDetails">
        <v-alert class="my-3">
          Erstell von {{ partner.createdByUsername }} am {{ partner.creationTime }}
        </v-alert>
        <v-alert class="my-3">
          Geändert von {{ partner.updatedByUsername }} am {{ partner.updateTime }}
        </v-alert>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
  import {Partner} from "@/model/store/Partner";
  import {PropType, ref} from "vue";
  import {useRouter} from "vue-router";

  const router = useRouter();

  const props = defineProps({
    partner: {
      type: Object as PropType<Partner>,
      required: true
    }
  });

  const showDetails = ref(false)
</script>
