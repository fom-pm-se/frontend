<template>
  <div v-if="isLoading">
    <div class="text-center">Lade Partner...</div>
    <v-progress-linear indeterminate color="secondary"></v-progress-linear>
  </div>
  <v-row>
    <v-col cols="12" :sm="!isSelected ? '12' : '6'">
      <v-list>
        <v-list-item v-for="partner in partners" :key="partner.id" :value="partner" active-color="secondary" @click="setSelected(partner)">
          <v-list-item-title>{{ partner.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ partner.type }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
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
    </v-col>
    <v-col sm="6">
      <partner-details v-if="isSelected" :partner="selectedPartner as Partner"></partner-details>
    </v-col>
  </v-row>
  <no-partner-created v-if="partners.length < 1 && !isLoading"></no-partner-created>
</template>

<script lang="ts" setup>
import {usePartnerStore} from "@/store/PartnerStore";
import {ref} from "vue";
import AddPartnerForm from "@/layouts/partner/AddPartnerForm.vue";
import NoPartnerCreated from "@/components/partner/NoPartnerCreated.vue";
import {Partner} from "@/model/store/Partner";
import PartnerDetails from "@/components/partner/PartnerDetails.vue";

const partnerStore = usePartnerStore();
const isLoading = partnerStore.isLoading;
const partners = ref(partnerStore.partners);

const showCreateDialog = ref(false);

const selectedPartner = ref("");
const isSelected = ref(false);

partnerStore.fetchPartners().finally(
  () => {
    partners.value = partnerStore.partners;
  }
);

function setSelected(partner: any) {
  if (selectedPartner.value === partner) {
    isSelected.value = false;
    selectedPartner.value = "";
    return;
  }
  selectedPartner.value = partner;
  isSelected.value = true;
}
</script>
