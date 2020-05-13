<template>
  <div class="StudentHomepage">
    <router-link to="/login"><button>Déconnexion</button></router-link>

    <h1>Espace étudiant</h1>

    <ProjectForm :studentModifier="true" :projectId="projectId" v-if="projectId !== null" />
    <h2 v-else>Vous n'avez aucun projet</h2>
  </div>
</template>

<script>
import ProjectForm from '../components/ProjectForm.vue';
import { getStudentData } from '../services/services.js';

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
    const data = await getStudentData(this.$route.params.id);
    this.name = data.name;
    this.projectId = data.projectId;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
