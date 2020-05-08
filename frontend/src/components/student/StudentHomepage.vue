<template>
  <div class="StudentHomepage">
    <h1>Espace étudiant</h1>

    <ProjectForm :generalModifier="true" :studentModifier="false" />
  </div>
</template>

<script>
import ProjectForm from '../ProjectForm.vue';

export default {
  name: 'StudentHomepage',
  components: {
    ProjectForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
