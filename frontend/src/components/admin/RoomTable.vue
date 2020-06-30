<template>
  <div class="RoomTable">
    <h1 class="text-center">Salles</h1>
    <v-expansion-panels>
      <v-expansion-panel v-for="room in roomsSettings" v-bind:key="room.id">
        <v-expansion-panel-header> {{ room.name }} </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model.trim="room.name"
                label="Nom"
                :value="room.name"
                required
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model.number="room.max_student"
                label="max étudiants"
                :value="room.max_student"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model.number="room.max_project"
                label="max projets"
                :value="room.max_project"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field
                v-model.number="room.max_student_per_project"
                label="étudiants/projets"
                :value="room.max_student_per_project"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-switch v-model="room.usable" label="Utilisable" ></v-switch>
            </v-col>
          </v-row>
          <v-color-picker v-model="room.color"></v-color-picker>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-btn v-on:click="send" style='margin-top:20px; margin-bottom:20px; background-color: #75b658'>Sauvegarder</v-btn>
    </v-expansion-panels>

    <ProjectsTable :rooms="oldRoomsSettings" />

    <v-card class="mx-auto" max-width="500" style='margin: 20px'>
      <v-card-title style="background-color:#75b658">Créer une salle</v-card-title>
      <v-cards-action>
        <v-row style='margin:auto'>
          <v-col cols="12" sm="6" md="5">
            <v-text-field
              v-on:keyup.enter="createRoom()"
              label="Nom"
              v-model="name"
              required
              filled rounded dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-on:keyup.enter="createRoom()"
                label="max étudiants"
                v-model="max_student"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-on:keyup.enter="createRoom()"
                label="max projets"
                v-model="max_project"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-on:keyup.enter="createRoom()"
                label="étudiants/projets"
                v-model="max_student_per_project"
                min="1" required 
                filled rounded dense
              ></v-text-field>
            </v-col>
        </v-row>
        <v-color-picker v-model="color" style='margin:auto' required></v-color-picker>
        <v-btn v-on:click='createRoom()' color='#75b658' style='margin:20px'>Sauvegarder</v-btn>
      </v-cards-action>
    </v-card>
    
      <v-alert v-if="notification" dismissible style="width: 400px; margin:auto" type="success">
        {{notification}}
      </v-alert>
      <v-alert v-if="errorMessage" dismissible style='width: 400px; margin:auto' type='error'></v-alert>

  </div>
</template>

<script>
import { getRooms, updateRoomsData, createRoom } from '../../services/services.js';
import ProjectsTable from './ProjectsTable.vue';

export default {
  name: 'RoomTable',
  components: {
    ProjectsTable
  },
  data () {
    return {
      /** @type {String} */
      name: null,
      /** @type {Number} */
      max_student: null,
      /** @type {Number} */
      max_project: null,
      /** @type {Number} */
      max_student_per_project: null,
      /** @type {String} */
      color: null,

      /** @type {Array.<{
       *  id: number,
       *  name: string,
       *  max_student: number,
       *  max_project: number,
       *  max_student_per_project: number,
       *  color: string,
       *  usable: boolean
       * }>} */
      oldRoomsSettings: [],
      /** @type {Array.<{
       *  id: number,
       *  name: string,
       *  max_student: number,
       *  max_project: number,
       *  max_student_per_project: number,
       *  color: string,
       *  usable: boolean
       * }>} */
      roomsSettings: [],
      errorMessage: null,
      notification: null
    }
  },
  async created() {
    this.oldRoomsSettings = await getRooms();
    this.roomsSettings = this.oldRoomsSettings.map(room => { return { ...room }; });
  },
  methods: {
    async createRoom () {
      if (this.name === null || this.name === '') {
        this.errorMessage = 'Le nom de la salle ne doit pas être laissée vide.';
      } else if (this.max_student === null || this.max_student === '') {
        this.errorMessage = 'Le champ max étudiants ne doit pas être laissé vide.';
      } else if (this.max_project === null || this.max_project === '') {
        this.errorMessage = 'Le champ max projets ne doit pas être laissé vide.';
      } else if (this.max_student_per_project === null || this.max_student_per_project === '') {
        this.errorMessage = 'Le champ étudiants/projets ne doit pas être laissé vide.';
      } else {
        const success = await createRoom(this.name, this.max_student, this.max_project, this.max_student_per_project, this.color.hex);
        
        if (success.error === undefined || success.error === null) {
          console.log('created');
          this.name = null;
          this.max_student = null;
          this.max_project = null;
          this.max_student_per_project = null;
        } else {
          this.errorMessage = success.error;
        }
      }
    },
    async send () {
      const sendData = [];
      
      for (let i = 0; i < this.oldRoomsSettings.length; i++) {
        const modifiedData = { id: this.oldRoomsSettings[i].id };

        if (this.oldRoomsSettings[i].name !== this.roomsSettings[i].name) {
          if (!this.roomsSettings[i].name) {
            this.errorMessage = 'Le nom des salles ne doit pas être laissé vide.';
            return;
          }
          if (this.roomsSettings.find(room => room !== this.roomsSettings[i] && room.name.toLowerCase() === this.roomsSettings[i].name.toLowerCase())) {
            this.errorMessage = 'Plusieurs salles ne peuvent pas avoir le même nom.';
            return;
          }
          modifiedData.name = this.roomsSettings[i].name;
        }

        if (this.oldRoomsSettings[i].max_student !== this.roomsSettings[i].max_student) {
          modifiedData.max_student = this.roomsSettings[i].max_student;
        }

        if (this.oldRoomsSettings[i].max_project !== this.roomsSettings[i].max_project) {
          modifiedData.max_project = this.roomsSettings[i].max_project;
        }

        if (this.oldRoomsSettings[i].max_student_per_project !== this.roomsSettings[i].max_student_per_project) {
          modifiedData.max_student_per_project = this.roomsSettings[i].max_student_per_project;
        }

        if (this.oldRoomsSettings[i].color !== this.roomsSettings[i].color) {
          if (this.roomsSettings.find(room => room !== this.roomsSettings[i] && room.color === this.roomsSettings[i].color)) {
            this.errorMessage = 'Plusieurs salles ne peuvent pas avoir la même couleur.';
            return;
          }
          modifiedData.color = this.roomsSettings[i].color;
        }

        if (this.oldRoomsSettings[i].usable !== this.roomsSettings[i].usable) {
          modifiedData.usable = this.roomsSettings[i].usable;
        }

        if (Object.keys(modifiedData).length > 1) {
          sendData.push(modifiedData);
        }
      }

      if (sendData.length > 0) {
        console.log(sendData);
        const resp = await updateRoomsData(sendData);
        if (resp.error) {
          this.errorMessage = resp.message;
        } else {
          this.notification = resp.message;
          this.roomsSettings.sort((r1, r2) => r1.name > r2.name ? 1 : r1.name === r2.name ? 0 : -1);
          this.oldRoomsSettings = this.roomsSettings.map(room => { return { ...room }; });
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>