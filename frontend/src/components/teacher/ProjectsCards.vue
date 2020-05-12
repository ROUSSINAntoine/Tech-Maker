<template>
  <div id='ProjectsCards'>
    <ul v-for='semester in semesters' v-bind:key='semester.id'>
      <li>
        <h2>Projet des {{ semester.name }}</h2>
        <ul v-for='project in semester.projects' v-bind:key='project.id'>
          <router-link :to='"project/" + project.id' :projectId="project.id">
            <li>
              <img :src='project.logo' :alt='"Logo du projet " + project.name' />
              <span>{{ project.name }}</span>
            </li>
          </router-link>
        </ul>
      </li>
    </ul>
    <CreateProject />
  </div>
</template>

<script>
import { getProjectsPerTeacher } from '../../services/services.js';
import CreateProject from './CreateProject.vue';

export default {
  name: 'ProjectsCards',
  componants: {
    CreateProject
  },
  data() {
    return {
      /** @type {Array.<{
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
