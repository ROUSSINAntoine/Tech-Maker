<template>
  <div class="StudentHomepage">
    <v-app-bar 
      color='#75b658'
      app
      clipped-left
    >
      <v-toolbar-title>Étudiant</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-on:click='disconnect' color='red' justify='center'>Déconnexion</v-btn>
    </v-app-bar>

    <h1 class='text-center'>Espace étudiant</h1>

    <div v-if="projectId !== null" style='display:flex; justify-content:center'>
      <ProjectForm :editable="true" :projectId="projectId"/>
    </div>

    <v-container fill-height fluid v-else >
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
          style="height: 300px;"
        >
    <v-alert type='error'>Vous n'avez aucun projet</v-alert>
    <!-- <h2 v-else>Vous n'avez aucun projet</h2> -->
        </v-row>
      </v-col>
    </v-row>
    </v-container>

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
      projectId: null,
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
