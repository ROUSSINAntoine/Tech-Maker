<template>
  <div id='Teacher'>
    <TeacherNavbar/>

    <router-view></router-view>
  </div>
</template>

<script>
import TeacherNavbar from '../components/teacher/TeacherNavbar.vue';

export default {
  name: 'TeacherHomepage',
  components: {
    TeacherNavbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
