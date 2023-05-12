<template>
    <v-row>
      <v-col>
        <h1><v-icon>mdi-cog</v-icon> Partner hinzufügen</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <alert-wrapper></alert-wrapper>
        <v-form
          @submit.prevent
        >
          <v-text-field label="Name" v-model="partner.name"/>
          <v-text-field label="Adresse" v-model="partner.address"></v-text-field>
          <v-text-field label="Telefonnummer" v-model="partner.phoneNumber"></v-text-field>
          <v-select label="Typ" no-data-text="Keine Daten vorhanden" :items="partnerTypes" v-model="partner.type" :disabled="partnerTypes.length < 1"></v-select>
          <v-btn variant="outlined" prepend-icon="mdi-content-save-outline" color="secondary" @click="savePartner">Speichern</v-btn>
        </v-form>
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {usePartnerStore} from "@/store/PartnerStore";
import {CreatePartner} from "@/model/request/CreatePartner";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";

const partnerStore = usePartnerStore();
const alertStore = useAlertStore();
const partnerTypes = ref(partnerStore.partnerTypes);

const emit = defineEmits(['success']);

const partner = ref({} as CreatePartner);

partnerStore.fetchPartnerTypes().finally(
  () => {
    partnerTypes.value = partnerStore.partnerTypes;
  }
);

function savePartner() {
  alertStore.clearAlerts();
  partnerStore.addPartner(partner.value).then(
    () => {
      partner.value = {} as CreatePartner;
      emit('success');
    }
  ).catch(error => {
    alertStore.setAlert({message: error.message, type: "error", title: "Fehler"});
  });
}
</script>
