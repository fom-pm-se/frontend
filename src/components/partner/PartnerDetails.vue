<template>
  <v-card elevation="6">
    <v-card-title>{{ partner.name }}
    <v-btn icon="mdi-arrow-expand" variant="text" color="secondary"></v-btn>
    </v-card-title>
    <v-card-subtitle>{{ partner.type }}</v-card-subtitle>
    <v-card-text>
      <v-text-field label="Adresse" readonly variant="plain" :model-value="partner.address"></v-text-field>
      <v-text-field label="Telefonnummer" readonly variant="plain" :model-value="partner.phoneNumber"></v-text-field>
      <v-btn prepend-icon="mdi-information" variant="outlined" color="secondary" @click="showDetails = !showDetails">Details anzeigen</v-btn>
    </v-card-text>
    <v-expand-transition>
      <v-card-text v-show="showDetails">
        <div>
          Erstellt von: {{ partner.createdByUsername }}
        </div>
        <div>
          Erstellt am: {{ partner.creationTime }}
        </div>
        <v-divider class="my-3"></v-divider>
        <div>
          Geändert von: {{ partner.updatedByUsername }}
        </div>
        <div>
          Geändert am: {{ partner.updateTime }}
        </div>
      </v-card-text>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
  import {Partner} from "@/model/store/Partner";
  import {PropType, ref} from "vue";

  const props = defineProps({
    partner: {
      type: Object as PropType<Partner>,
      required: true
    }
  });

  const showDetails = ref(false)
</script>
