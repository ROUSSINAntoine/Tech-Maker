<template>
  <div name='AdminHomepage'>
    <AdminNavbar/>
    <router-view name='AdminCSV'>Étudiants</router-view>

    <router-view></router-view>
  </div>
</template>

<script>
import AdminNavbar from '../components/admin/AdminNavbar.vue';
export default {
  name: 'AdminHomepage',
  components: {
    AdminNavbar
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this comnent only -->
<style scoped>
</style>
