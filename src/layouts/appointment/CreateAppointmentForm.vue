<template>
    <v-card>
      <v-card-title>Termin hinzufügen</v-card-title>
      <v-card-text>
        <v-form :disabled="loading">

          <!--v-date-picker requires v3.3.4 <v-date-picker>TEST</v-date-picker> --> 
            <v-text-field v-model="title" type="text" label="Titel"></v-text-field>
            <v-text-field v-model="start" type="datetime-local" label="Start"></v-text-field>
            <v-text-field v-model="end" type="datetime-local" label="Ende"></v-text-field>
            <v-text-field v-model="place" type="text" label="Ort"></v-text-field>

          <v-btn @click="download()" variant="tonal" prepend-icon="mdi-content-save-outline" color="secondary" :loading="loading"
                 >Export
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  





</template>

<script setup lang="ts">

import { ref } from "vue";


const loading = ref(false);
const title = ref();
const start = ref();
const end = ref();
const place = ref();

const newEvent = "BEGIN:VCALENDAR"+"\n"+
"VERSION:2.0"+"\n"+
"PRODID:-//Ben Fortuna//iCal4j 1.0//EN"+"\n"+
"CALSCALE:GREGORIAN"+"\n"+
"METHOD:PUBLISH"+"\n"+
"X-WR-TIMEZONE:Europe/Berlin"+"\n"+
"BEGIN:VEVENT"+"\n"+
"DTSTAMP:20230712T211531Z"+"\n"+
"DTSTART:20230113T170000Z"+"\n"+
"DTEND:20230113T201500Z"+"\n"+
"SUMMARY:FOM MS - Führung & Nachhaltigkeit"+"\n"+
"UID:6164037"+"\n"+
"LOCATION:Martin-Luther-King-Weg 30-30a, 48155 Münster, MS - Studienzent"+"\n"+
" rum Münster, Raum: MS/Etage EG Raum 01"+"\n"+
"DESCRIPTION:"+"\n"+
"SEQUENCE:0"+"\n"+
"END:VEVENT"+"\n"+
"END:VCALENDAR";


function download () {
    let filename = 'calendar.ics';
    let text =  newEvent;

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

    element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	document.body.removeChild(element);

    loading.value = true;
}
</script>