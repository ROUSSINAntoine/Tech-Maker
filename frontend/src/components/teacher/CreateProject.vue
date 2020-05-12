<template>
  <div id='CreateProject'>
    <h1>Créer un nouveau projet</h1>
    <input type='text' v-model='projectName' placeholder='Nom du projet' reuired />
    <div v-for='semester in semesters' v-bind:key='semester.id' >
      <input type='radio' :id='semester.id' :value='semester.id' v-model='projectSemesterId' required />
      <label :for='semester.id'>{{ semester.name }}</label>
    </div>
    <button v-on:click='saveProject()'>Enregistrer</button>
    <span v-if='errorMessage !== null'>{{ errorMessage }}</span>
  </div>
</template>

<script>
import {
  createProject,
  getSemesterPerTeacher
} from '../../services/services.js';

export default {
  name: 'CreateProject',
  data() {
    return {
      /** 
       * Admin is `true`, Teacher is `false`.
       */
      adminOrTeacher: false,
      projectName: null,
      errorMessage: null,
      projectSemesterId: null,
      /** @type {Array.<{ id: Number, name: String }>} */
      semesters: []
    };
  },
  async created () {
    this.semester = await getSemesterPerTeacher(this.$route.params.id);
  },
  methods: {
    async saveProject () {
      if (this.projectName === null || this.projectName === '') {
        this.errorMessage = 'Le nom du projet ne doit pas être laissé vide.';
      } else if (this.projectSemesterId === null) {
        this.errorMessage = 'Un semester doit être selectionné'
      } else {
        const project = await createProject(this.projectName, this.projectSemesterId);
        console.log(project);
        this.errorMessage = null;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
