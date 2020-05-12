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
import { createProject } from '../../services/services.js';

export default {
  name: 'CreateProject',
  data() {
    return {
      projectName: null,
      errorMessage: null,
      projectSemesterId: null,
      semesters: [
        {
          id: 1,
          name: 'S1'
        },
        {
          id: 5,
          name: 'S4 IL'
        }
      ]
    };
  },
  methods: {
    async saveProject() {
      if (this.projectName === null || this.projectName === '') {
        this.errorMessage = 'Le nom du projet ne doit pas être laissé vide.';
        return;
      } else if (this.projectSemesterId === null) {
        this.errorMessage = 'Un semester doit être selectionné'
      } else {
        console.log(-1);
        /*const project = await */createProject(this.projectName, this.projectSemesterId);
//        console.log(project);
        this.errorMessage = null;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
