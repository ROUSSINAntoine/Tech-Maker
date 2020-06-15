<template>
  <div class="RoomTable">
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Couleur</th>
          <th>Étudiants max</th>
          <th>Projets max</th>
          <th>Étudiants par projet</th>
          <th>Utilisable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="room in roomsSettings" v-bind:key="room.id">
          <td><input type="text" v-model.trim="room.name" required @change="owo" /></td>
          <td><input type="color" v-model="room.color" required /></td>
          <td><input type="number" v-model.number="room.max_student" min="1" required /></td>
          <td><input type="number" v-model.number="room.max_project" min="1" required /></td>
          <td><input type="number" v-model.number="room.max_student_per_project" min="1" required /></td>
          <td><input type="checkbox" v-model="room.usable" /></td>
        </tr>
      </tbody>
    </table>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <span v-if="notification">{{ notification }}</span>
    <button v-on:click="send">Sauvegarder</button>

    <ProjectsTable :rooms="oldRoomsSettings" />
  </div>
</template>

<script>
import { getRooms, updateRoomsData } from '../../services/services.js';
import ProjectsTable from './ProjectsTable.vue';

export default {
  name: 'RoomTable',
  components: {
    ProjectsTable
  },
  data () {
    return {
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
    owo () { console.log('owo'); },
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