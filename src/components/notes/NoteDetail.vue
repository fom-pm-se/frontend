<template>
  <v-card color="secondary" variant="tonal">
    <v-card-title>{{ note.title }}</v-card-title>
    <v-card-subtitle>{{ note.createdByUsername }}</v-card-subtitle>
    <v-card-text>{{ note.content }}</v-card-text>
    <v-card-actions>
      <v-btn prepend-icon="mdi-pencil" @click="showEditNoteDialog = !showEditNoteDialog">Bearbeiten</v-btn>
      <v-btn icon="mdi-information-outline" @click="showHistory = !showHistory"></v-btn>
      <v-btn icon="mdi-delete" color="error" @click="deleteNote"></v-btn>
    </v-card-actions>
    <v-expand-transition>
      <v-card-text v-show="showHistory">
        <v-alert class="my-3">Erstellt von {{ note.createdByUsername }} am {{ note.creationTime }}</v-alert>
        <v-alert class="my-3">Geändert von {{ note.updatedByUsername }} am {{ note.updateTime }}</v-alert>
      </v-card-text>
    </v-expand-transition>
  </v-card>
  <v-dialog v-model="showEditNoteDialog" width="500">
    <v-container>
      <create-note-form :partner="props.partner as Partner" :note="note"
                        @success="showEditNoteDialog = false"></create-note-form>
    </v-container>
  </v-dialog>
  <snackbar-wrapper/>
</template>

<script lang="ts" setup>
import {PropType, ref} from "vue";
import {Note} from "@/model/store/Note";
import {Partner} from "@/model/store/Partner";
import CreateNoteForm from "@/layouts/notes/CreateNoteForm.vue";
import {useNoteStore} from "@/store/NoteStore";
import SnackbarWrapper from "@/components/common/SnackbarWrapper.vue";
import {useAlertStore} from "@/store/AlertStore";

const noteStore = useNoteStore();
const alertStore = useAlertStore();

const props = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  },
  partner: {
    type: Object as PropType<Partner>,
    required: true
  }
});

const showEditNoteDialog = ref(false as boolean);

const showHistory = ref(false);

function deleteNote() {
  noteStore.deleteNoteById(props.note.id as string | number).then(() => {});
  alertStore.showSnackbarMessage("Notiz gelöscht");
}
</script>
