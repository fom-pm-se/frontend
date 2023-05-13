import {CreateNote, Note, UpdateNote} from "@/model/store/Note";
import {defineStore} from "pinia";
import axios from "axios";
import {API_CREATE_NOTE, API_GET_NOTES, API_UPDATE_NOTE} from "@/axios/ApiConstants";

export const useNoteStore = defineStore('noteStore', {
    state: () => (
      {notes: [] as Note[]}
    ),
    actions: {
      async getNotes(partnerId: number | string) {
        const notesResponse = await axios.get<Note[]>(API_GET_NOTES + '/' + partnerId);
        if (notesResponse.status === 200) {
          this.notes = notesResponse.data;
          return Promise.resolve(notesResponse.data);
        }
        return Promise.reject(notesResponse.data);
      },
      async updateNote(note: UpdateNote) {
        const noteResponse = await axios.put<Note>(API_UPDATE_NOTE, note);
        if (noteResponse.status === 200) {
          this.notes.forEach((n, index) => {
            if (n.id === note.id) {
              this.notes[index] = noteResponse.data;
            }
          });
          return Promise.resolve(noteResponse.data);
        }
        return Promise.reject(noteResponse.data);
      },
      async createNote(note: CreateNote) {
        const noteResponse = await axios.post<Note>(API_CREATE_NOTE, note);
        if (noteResponse.status === 200) {
          this.notes.unshift(noteResponse.data);
          return Promise.resolve(noteResponse.data);
        }
        return Promise.reject(noteResponse.data);
      },
      async deleteNoteById(id: number | string) {
        const response = await axios.delete(API_UPDATE_NOTE + '/' + id);
        if (response.status === 200) {
          this.notes.forEach((n, index) => {
            if (n.id === id) {
              this.notes.splice(index, 1);
            }
          });
          return Promise.resolve(response.data);
        }
        return Promise.reject(response.data);
      }
    }
  }
);
