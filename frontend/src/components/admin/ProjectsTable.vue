<template>
  <div class="ProjectsTable">
    <h1>Placement des projets</h1>
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Nombre d'étudiants</th>
          <th>Salle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" v-bind:key="project.id">
          <td>
            <router-link :to="`/admin/projet/${project.id}`">{{ project.name }}</router-link>
          </td>
          <td>{{ project.nbStudents }}</td>
          <td>
            <select v-model="project.roomId">
              <option :value="null">Choisir</option>
              <option
                v-for="room in getValidRooms(project)" v-bind:key="room.id"
                :value="room.id"
                >{{ room.name }}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click="send">Sauvegarder</button>
    <span v-if="errorMessage">{{ errorMessage }}</span>
    <span v-if="notification">{{ notification }}</span>
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
