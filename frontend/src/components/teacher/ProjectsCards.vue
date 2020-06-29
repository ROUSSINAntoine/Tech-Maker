<template>
  <div id="ProjectsCards">
    <h1 class='text-center'>Projets</h1>
    
    <v-row justify="center">
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="semester in semesters" v-bind:key="semester.name">
          <v-expansion-panel-header>{{semester.name}}</v-expansion-panel-header>
            <v-expansion-panel-content
              v-for="project in semester.projects" v-bind:key="project.id"
            >
            <v-row>
              <v-col cols="12" sm="5">
                <h2>{{project.name}}</h2><br>
                <router-link :to="'project/' + project.id" :projectId="project.id" class='routerlink'><v-btn style='margin:5px'>Modifier</v-btn></router-link>
              </v-col>
              <v-col cols="12" sm="5">
                <span v-if="project.status === 'waiting'"><v-icon>update</v-icon></span>
                <!--{{ project.describe }}-->
              </v-col>
            </v-row>
                <v-divider style='margin:5px'></v-divider>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    
    <div>
      <CreateProject v-on:created-project="addProject" />
    </div> 
    
  </div>
</template>

<script>
import { getProjectsPerTeacher } from '../../services/services.js';
import CreateProject from './CreateProject.vue';

export default {
  name: 'ProjectsCards',
  components: {
    CreateProject
  },
  data() {
    return {
      /**
       * @type {Array.<{
       *  id: Number,
       *  name: String,
       *  projects: Array.<{ id: Number, name: String, logo: String, status: string }
       * }>}
       */
      semesters: []
    };
  },
  async created() {
    this.semesters = await getProjectsPerTeacher();
  },
  methods: {
    /**
     * Add new created project on the project list.
     * @param {Array.<{ id: Number, name: String, semesterId: Number }>}
     */
    addProject (data) {
      /** @type {{
       *  id: Number,
       *  name: String,
       *  projects: Array.<{ id: Number, name: String, logo: String, status: string }>
       * }}
       */
      const semester = this.semesters.find(semester => semester.id === data.semesterId);
      if (semester !== undefined) {
        semester.projects.push({
          id: data.id,
          name: data.name,
          logo: null 
        });
        semester.projects.sort((sA, sB) => sA.name.toLowerCase() < sB.name.toLowerCase()
          ? -1
          : sA.name.toLowerCase() === sB.name.toLowerCase()
            ? 0
            : 1
        );
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
