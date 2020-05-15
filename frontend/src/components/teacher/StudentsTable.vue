<template>
  <div id='ProjectsCards'>
    <ul v-for='semester in semesters' v-bind:key='semester.id'>
      <li>
        <h2>Projet des {{ semester.name }}</h2>
        <ul v-for='project in semester.projects' v-bind:key='project.id'>
          <img :src='project.logo' :alt='"Logo du projet " + project.name' />
          <span>{{ project.name }}</span>
        </ul>
      </li>
    </ul>    
  </div>
</template>

<script>
export default {
  name: 'ProjectsCards',
  data() {
    return {
      semesters: [
        {
          id: 1,
          name: 'S4 IL',
          students: [
            {
              id: 1,
              firstname: 'Romain',
              lastname: 'Delorme-Glorieux',
              project: {
                id: 1,
                name: 'TechMaker'
              }
            },
            {
              id: 2,
              firstname: 'Antoine',
              lastname: 'Roussin',
              project: {
                id: 1,
                name: 'Tech Maker'
              }
            },
            {
              id: 3,
              firstname: 'Titon',
              lastname: ''
            }
          ]
        }
      ],
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
