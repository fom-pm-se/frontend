<template>
  <v-card elevation="4">
    <v-card-title>Notizen für {{ partner.name }}</v-card-title>
    <alert-wrapper/>
    <v-card-actions>
      <v-btn color="secondary" prepend-icon="mdi-plus" variant="tonal" @click="showCreateNoteDialog = true">Notiz
        hinzufügen
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <v-timeline side="end" v-if="notes.length > 0">
        <v-timeline-item v-for="note in notes" dot-color="secondary" :key="note.id">
          <note-detail :note="note as Note" :partner="partner as Partner"></note-detail>
        </v-timeline-item>
      </v-timeline>
      <v-alert v-else rounded="xl" variant="tonal" color="warning">Keine Notizen vorhanden</v-alert>
    </v-card-text>
    <v-dialog v-model="showCreateNoteDialog" width="500">
      <v-container>
        <create-note-form :partner="props.partner as Partner" @success="showCreateNoteDialog = false"></create-note-form>
      </v-container>
    </v-dialog>
  </v-card>
  <snackbar-wrapper/>
</template>
<script lang="ts" setup>
import CreateNoteForm from "@/layouts/notes/CreateNoteForm.vue";
import {Partner} from "@/model/store/Partner";
import {PropType, ref} from "vue";
import {useNoteStore} from "@/store/NoteStore";
import SnackbarWrapper from "@/components/common/SnackbarWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";
import AlertWrapper from "@/components/common/AlertWrapper.vue";
import {Note} from "@/model/store/Note";
import NoteDetail from "@/components/notes/NoteDetail.vue";

const noteStore = useNoteStore();
const alertStore = useAlertStore();

const showCreateNoteDialog = ref(false as boolean);

const props = defineProps({
  partner: {
    type: Object as PropType<Partner>,
    required: true
  }
});

const notes = ref(noteStore.notes)

noteStore.getNotes(props.partner.id).then(() => {
  notes.value = noteStore.notes;
}).catch(() => {
  alertStore.setAlert({message: "Notizen konnten nicht geladen werden", title: "Fehler", type: "error"})
})

</script>
