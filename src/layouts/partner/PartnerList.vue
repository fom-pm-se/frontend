<template>
  <alert-wrapper/>
  <v-row>
    <v-btn prepend-icon="mdi-chevron-down" variant="text" color="secondary" @click="showSearchMenu = !showSearchMenu">Aktionen</v-btn>
    <v-expand-transition>
      <v-container fluid v-show="showSearchMenu">
        <v-text-field label="Suche" variant="underlined" prepend-inner-icon="mdi-magnify" v-model="searchTerm" @update:modelValue="searchPartnersForName"></v-text-field>
        <v-dialog v-model="showCreateDialog">
          <v-container>
            <v-card>
              <v-card-text>
                <add-partner-form @success="newPartnerCreated"></add-partner-form>
              </v-card-text>
            </v-card>
          </v-container>
        </v-dialog>
        <v-btn prepend-icon="mdi-refresh" variant="outlined" color="secondary" @click="fetchPartners" class="mr-3">Neu laden</v-btn>
        <v-btn prepend-icon="mdi-plus" variant="outlined" color="secondary" @click="showCreateDialog = true">Neuer Partner</v-btn>
      </v-container>
    </v-expand-transition>
  </v-row>
  <v-row>
    <v-col cols="12" sm="6">
      <v-list>
        <h3 class="mb-3">Partner</h3>
        <v-alert v-if="searchTerm.length > 0 && searchResults.length === 0">Keine Ergebnisse</v-alert>
        <v-list-item v-for="partner in searchResults" :key="partner.id" :value="partner" active-color="secondary" @click="setSelected(partner)" class="pa-2 pl-8">
          <v-list-item-title>{{ partner.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ partner.type }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col sm="6">
      <v-slide-x-transition>
        <partner-details :partner="selectedPartner as Partner" v-show="isSelected"></partner-details>
      </v-slide-x-transition>
    </v-col>
  </v-row>
  <no-partner-created v-if="partners.length < 1 && !isLoading" @create-partner="showCreateDialog = true"></no-partner-created>
  <snackbar-wrapper/>
</template>

<script lang="ts" setup>
import {usePartnerStore} from "@/store/PartnerStore";
import {ref} from "vue";
import AddPartnerForm from "@/layouts/partner/AddPartnerForm.vue";
import NoPartnerCreated from "@/components/partner/NoPartnerCreated.vue";
import {Partner} from "@/model/store/Partner";
import PartnerDetails from "@/components/partner/PartnerDetails.vue";
import SnackbarWrapper from "@/components/common/SnackbarWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import AlertWrapper from "@/components/common/AlertWrapper.vue";

const partnerStore = usePartnerStore();
const isLoading = partnerStore.isLoading;
const partners = ref(partnerStore.partners);
const alertStore = useAlertStore();

const showSearchMenu = ref(false);
const showCreateDialog = ref(false);

const selectedPartner = ref("");
const isSelected = ref(false);

const searchTerm = ref("" as string);
const searchResults = ref([] as Partner[]);

partnerStore.fetchPartners().finally(
  () => {
    partners.value = partnerStore.partners;
    searchResults.value = {...partners.value};
  }
);

function searchPartnersForName(nameSearchTerm: string) {
  searchResults.value = partners.value.filter((partner: Partner) => {return partner.name.includes(nameSearchTerm)})
}
const note = ref({} as Object);

function setSelected(partner: any) {
  if (selectedPartner.value === partner && isSelected.value) {
    isSelected.value = false;
    return;
  }
  selectedPartner.value = partner;
  isSelected.value = true;
}

function fetchPartners() {
  partnerStore.fetchPartners().finally(
    () => {
      partners.value = partnerStore.partners;
    }
  );
}

function newPartnerCreated() {
  showCreateDialog.value = false;
  alertStore.showSnackbarMessage("Partner gespeichert");
}
</script>
