<template>
  <div id="ProjectsCards">
    <ul v-for="semester in semesters" v-bind:key="semester.name">
      <li>
        <h2>Projet des {{ semester.name }}</h2>
        <ul v-for="project in semester.projects" v-bind:key="project.id">
          <router-link :to="'project/' + project.id" :projectId="project.id">
            <li>
              <img
                :src="project.logo ? project.logo : 'https://s.ytimg.com/yts/img/favicon_144-vfliLAfaB.png' /* DEDAULT LOGO */" 
                :alt="'Logo du projet ' + project.name"
              />
              <span>{{ project.name }}</span>
            </li>
          </router-link>
        </ul>
      </li>
    </ul>
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
       *  projects: Array.<{ id: Number, name: String, logo: String }
       * }>}
       */
      semesters: []
    };
  },
  async created() {
    this.semesters = await getProjectsPerTeacher(this.$route.params.id);
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
       *  projects: Array.<{ id: Number, name: String, logo: String }>
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
