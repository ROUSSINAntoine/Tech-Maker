<template>
  <div class="ProjectsTable">
    <v-card class="mx-auto" max-width="500">
      <v-card-title style="background-color:#75b658">Placement de projets</v-card-title>
        <v-expansion-panels>
          <v-expansion-panel v-for="project in projects" v-bind:key="project.id">
            <v-expansion-panel-header>{{ project.name }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider style='margin:10px'></v-divider>
                <router-link :to="`/admin/project/${project.id}`"><v-btn>Accéder au projet</v-btn></router-link>
                <v-spacer style='margin:10px'></v-spacer>
                Nombre d'étudiants : {{ project.nbStudents }}
                <v-spacer style='margin:10px'></v-spacer>
                Salle : <select v-model="project.roomId">
                    <option :value="null">Choisir</option>
                    <option
                      v-for="room in getValidRooms(project)" v-bind:key="room.id"
                      :value="room.id"
                      >{{ room.name }}</option>
                  </select>
                  <v-spacer style='margin:10px'></v-spacer>
                  <v-btn v-on:click="send" style='margin-top:20px; margin-bottom:20px; background-color: #75b658'>Sauvegarder</v-btn>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
    </v-card>
    <v-alert v-if="errorMessage" dismissible style="width: 400px; margin:auto" type="error">
      {{ errorMessage }}
    </v-alert>
    <v-alert v-if="notification" dismissible style="width: 400px; margin:auto" type="success">
      {{ notification }}
    </v-alert>
  </div>
</template>

<script>
import { getProjectShortData, updateProjectsRoom } from '../../services/services.js';

export default {
  name: 'ProjectsTable',
  data() {
    return {
      /** @type {Array.<{ id: number, name: string, nbStudents: number, roomId: number }>} */
      oldProjectsValues: [],
      /** @type {Array.<{ id: number, name: string, nbStudents: number, roomId: number }>} */
      projects: [],
      /** @type {string} */
      errorMessage: null,
      /** @type {string} */
      notification: null
    }
  },
  props: {
    rooms: Array
  },
  async created () {
    this.projects = await getProjectShortData();
    this.oldProjectsValues = this.projects.map(p => { return { id: p.id, roomId: p.roomId }; });
  },
  methods: {
    getValidRooms (project) {
      console.log('Ag !')
      const projects = this.projects;
      return this.rooms.filter(function (room) {
        let projectsInRoom = projects.filter(p => p.roomId === room.id);
        
        projectsInRoom.filter(function (p) {
          const result = p.nbStudents > room.max_student_per_project;
          if (result) {
            p.roomId = null;
          }
          return result;
        });

        if (!room.usable ||
            projectsInRoom.length > room.max_project ||
            projectsInRoom.map(p => p.nbStudents).reduce((p1, p2) => p1 + p2, 0) > room.max_student) {
          projectsInRoom.forEach(p => p.roomId = null);
          projectsInRoom = [];
        }
        
        return room.usable &&
          (
            project.roomId === room.id ||
            (
              project.nbStudents <= room.max_student_per_project &&
              projectsInRoom.length < room.max_project &&
              projectsInRoom.map(p => p.nbStudents).reduce((p1, p2) => p1 + p2, 0) + project.nbStudents <= room.max_student
            )
          )
      });
    },
    async send () {
      const sendData = [];
      for (const oldData of this.oldProjectsValues) {
        const project = this.projects.find(p => p.id === oldData.id);
        /*if (project.roomId === null) {
          sendData.push({ id: project.id, remove: true });
        }*/
        if (oldData.roomId !== project.roomId) {
          sendData.push(project.roomId
            ? { id: project.id, roomId: project.roomId }
            : { id: project.id, remove: true }
          );
        }
      }
      console.log(sendData);
      if (sendData.length > 0) {
        const result = await updateProjectsRoom(sendData);
        if (result.error) {
          this.errorMessage = result.message;
          this.notification = null;
        } else {
          this.errorMessage = null;
          this.notification = result.message;
          this.oldProjectsValues = this.projects.map(p => { return { id: p.id, roomId: p.roomId }; });
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
