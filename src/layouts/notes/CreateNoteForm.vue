<template>
  <v-card>
    <v-card-title>{{ !props.note ? 'Notiz hinzufügen' : 'Notiz bearbeiten' }}</v-card-title>
    <v-card-subtitle v-if="props.note">Id: {{ props.note.id }}</v-card-subtitle>
    <v-card-text>
      <v-form :disabled="loading">
        <v-text-field label="Titel" v-model="editNote.title"></v-text-field>
        <v-textarea label="Inhalt" v-model="editNote.content"></v-textarea>
        <v-btn variant="tonal" prepend-icon="mdi-content-save-outline" color="secondary" :loading="loading"
               @click="submit">Speichern
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import {PropType, ref} from "vue";
import {Partner} from "@/model/store/Partner";
import {Note} from "@/model/store/Note";
import {useNoteStore} from "@/store/NoteStore";
import {useAlertStore} from "@/store/AlertStore";

const alertStore = useAlertStore();

const loading = ref(false);

const noteStore = useNoteStore();

const props = defineProps({
  partner: {
    type: Object as PropType<Partner>,
    required: true
  },
  note: {
    type: Object as PropType<Note>,
    required: false
  }
});

const editNote = ref({...props.note as Note} as Note);

const emit = defineEmits(['success']);

const note = ref({} as Object);
note.value = props.note ? props.note : {title: "", content: "", partnerId: props.partner.id};

function submit() {
  loading.value = true;
  if (props.note) {
    updateNote();
  } else {
    createNote();
  }
  alertStore.showSnackbarMessage("Notiz gespeichert");
}

function updateNote() {
  noteStore.updateNote({
    id: props.note?.id as string | number,
    title: editNote.value.title,
    content: editNote.value.content
  }).then(() => {
    emit('success');
  }).finally(() => {
    loading.value = false;
  });
}

function createNote() {
  noteStore.createNote({
    title: editNote.value.title,
    content: editNote.value.content,
    partnerId: props.partner.id
  }).then(() => {
    emit('success');
  }).finally(() => {
    loading.value = false;
  });
}
</script>
