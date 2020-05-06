<template>
  <div id='Teacher'>
    <TeacherNavbar />
    <TechnologiesTable :isAdmin='true' :teacherId='teacherId' />
    <ProjectsCards :teacherId='teacherId' />
  </div>
</template>

<script>
import TeacherNavbar from '../components/teacher/TeacherNavbar.vue';
import TechnologiesTable from '../components/teacher/TechnologiesTable.vue';
import ProjectsCards from '../components/teacher/ProjectsCards.vue';

export default {
  name: 'TeacherHomepage',
  components: {
    TeacherNavbar,
    TechnologiesTable,
    ProjectsCards
  },
  data() {
    return {
      teacherId: 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
