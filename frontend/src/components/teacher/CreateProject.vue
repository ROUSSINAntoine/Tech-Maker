<template>
  <div id='CreateProject'>
    <h1>Créer un nouveau projet</h1>

    <input type='text' v-model='projectName' placeholder='Nom du projet' required />

    <div v-for='semester in semesters' v-bind:key='semester.id' >
      <input
        v-model='semesterId'
        type='radio'
        :id='semester.id'
        :value='semester.id'
        required
      />
      <label :for='semester.id'>{{ semester.name }}</label>
    </div>

    <button v-on:click='saveProject()'>Enregistrer</button>
    <span v-if='errorMessage !== null'>{{ errorMessage }}</span>
  </div>
</template>

<script>
import {
  createProject,
  getSemestersPerTeacher,
  getAllSemestersName
} from '../../services/services.js';

export default {
  name: 'CreateProject',
  data() {
    return {
      projectName: null,
      errorMessage: null,
      semesterId: null,
      /** @type {Array.<{ id: Number, name: String }>} */
      semesters: []
    };
  },
  async created () {
    /** @type {String} */
    const userType = this.$route.path.split('/')[1];
    this.semester = userType === 'teacher'
      ? await getSemestersPerTeacher(this.$route.params.id)
      : await getAllSemestersName();
  },
  methods: {
    async saveProject () {
      if (this.projectName === null || this.projectName === '') {
        this.errorMessage = 'Le nom du projet ne doit pas être laissé vide.';

      } else if (this.semesterId === null) {
        this.errorMessage = 'Un semester doit être selectionné';

      } else {
        const success = await createProject(this.projectName, this.semesterId);
        if (success.id !== null) {
          this.$emit('created-project', { id: success.id, name: success.name });
          this.errorMessage = null;
          this.projectName = null;
          this.semesterId = null;
        } else {
          this.errorMessage = success.error;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
