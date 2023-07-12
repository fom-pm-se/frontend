<template>
  <v-btn variant="outlined" color="secondary" @click="router.back()" prepend-icon="mdi-arrow-left" class="ma-4">Zurück
  </v-btn>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <partner-details :partner="selectedPartner as Partner"/>
        <v-card elevation="4" class="mt-3">
          <v-card-title>Keyaccount</v-card-title>
          <v-card-text>
            <set-key-account-form/>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col sm="6">
        <note-timeline v-if="finishLoading" :partner="selectedPartner as Partner"/>
        <v-progress-linear v-if="!finishLoading" indeterminate color="secondary"></v-progress-linear>
        <v-card elevation="4" class="mt-3"></v-card>
          <appointment-timeline />
      </v-col>
    </v-row>
  </v-container>
  <alert-wrapper/>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {usePartnerStore} from "@/store/PartnerStore";
import {onMounted, ref} from "vue";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import PartnerDetails from "@/components/partner/PartnerDetails.vue";
import {Partner} from "@/model/store/Partner";
import NoteTimeline from "@/components/notes/NoteTimeline.vue";
import SetKeyAccountForm from "@/layouts/partner/SetKeyAccountForm.vue";
import AppointmentTimeline from "@/components/appointment/AppointmentTimeline.vue";

const route = useRoute();
const router = useRouter();
const partnerStore = usePartnerStore();
const alertStore = useAlertStore();

const partnerId = route.params.id;

const selectedPartner = ref({} as Partner);

const finishLoading = ref(false);

onMounted(() => {
  partnerStore.fetchPartnerById(partnerId).then((partner) => {
    selectedPartner.value = partner;
    finishLoading.value = true;
  }).catch(() => {
    alertStore.setAlert({message: "Partner konnte nicht gefunden werden", title: "Fehler", type: "error"})
    router.push("/partner");
  })
})
</script>
