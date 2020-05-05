<template>
  <div id='Teacher'>
    <TeacherNavbar />
    <TechnologiesTable :modifyTechno='false' />
  </div>
</template>

<script>
import TeacherNavbar from '../components/teacher/TeacherNavbar.vue';
import TechnologiesTable from '../components/teacher/TechnologiesTable.vue';

export default {
  name: 'TeacherHomepage',
  components: {
    TeacherNavbar,
    TechnologiesTable
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
