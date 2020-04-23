<template>
  <div id="app">
    <AdminHomepage/>
  </div>
</template>

<script>
import AdminHomepage from './components/AdminHomepage.vue'

export default {
  name: 'App',
  components: {
    AdminHomepage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
