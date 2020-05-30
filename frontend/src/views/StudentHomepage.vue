<template>
  <div class="StudentHomepage">
    <button v-on:click='disconnect'>Déconnexion</button>

    <h1>Espace étudiant</h1>

    <ProjectForm :editable="true" :projectId="projectId" v-if="projectId !== null" />
    <h2 v-else>Vous n'avez aucun projet</h2>
  </div>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import { getStudentData } from '../services/services.js';
import { logout } from '../services/services.js';

export default {
  name: 'StudentHomepage',
  components: {
    ProjectForm
  },
  data() {
    return {
      name: null,
      projectId: null
    }
  },
  async created() {
    const data = await getStudentData();
    console.log('data', data)
    this.name = data.name;
    this.projectId = data.projectid;
  },
  methods: {
    async disconnect () {
      await logout();
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
