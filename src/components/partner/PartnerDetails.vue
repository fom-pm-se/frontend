<template>
  <v-card elevation="6">
    <v-card-title>{{ partner.name }}
    <v-btn icon="mdi-arrow-expand" variant="text" color="secondary" @click="router.push('/partner/' + partner.id)"></v-btn>
    </v-card-title>
    <v-card-text><h4>Art: {{ partner.type }}</h4></v-card-text>
    <v-card-text>
      <v-text-field label="Adresse" readonly variant="plain" :model-value="partner.address"></v-text-field>
      <v-text-field label="Telefonnummer" readonly variant="plain" :model-value="partner.phoneNumber"></v-text-field>
      <v-btn :prepend-icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'" variant="text" color="secondary" @click="showDetails = !showDetails">Änderungsdetails</v-btn>
      <v-btn color="error" icon="mdi-delete" variant="text"></v-btn>
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
