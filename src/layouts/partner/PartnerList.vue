<template>
  <div v-if="isLoading">
    <div class="text-center">Lade Partner...</div>
    <v-progress-linear indeterminate color="secondary"></v-progress-linear>
  </div>
  <v-dialog v-model="showCreateDialog">
    <template v-slot:activator="{ props }">
      <v-btn
        color="secondary"
        prepend-icon="mdi-vector-square-plus"
        variant="outlined"
        v-bind="props"
      >
        Partner hinzufügen
      </v-btn>
    </template>
    <v-card>
      <add-partner-form></add-partner-form>
    </v-card>
  </v-dialog>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto pa-12"
    elevation="0"
    rounded
    max-width="800"
    width="100%"
    v-if="!isLoading && partners.length === 0 && false"
  >
    <div>
      <h2 class="text-h4 font-weight-medium mb-4">Keine Partner vorhanden...</h2>

      <div class="text-h5 font-weight-light mb-2">
        Es wurden noch keine Partner angelegt. Klicke auf "Partner hinzufügen" um zu beginnen
      </div>
      <v-btn variant="tonal" prepend-icon="mdi-vector-square-plus" color="secondary" class="ma-3">Partner hinzufügen
      </v-btn>
      <v-btn icon="mdi-information" variant="text" color="secondary"></v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts" setup>
import {usePartnerStore} from "@/store/PartnerStore";
import {ref} from "vue";
import AddPartnerForm from "@/layouts/partner/AddPartnerForm.vue";

const partnerStore = usePartnerStore();
const isLoading = partnerStore.isLoading;
const partners = ref(partnerStore.partners);

const showCreateDialog = ref(false);

partnerStore.fetchPartners().finally(
  () => {
    partners.value = partnerStore.partners;
  }
);
</script>
