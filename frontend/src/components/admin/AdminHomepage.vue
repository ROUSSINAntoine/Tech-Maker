<template>
  <div name='AdminHomepage'>
    <div name='navbar'>
      <router-link to='admin/AdminStudentCSV' tag="button">Étudiants</router-link>
      <button v-on:click='a_jurys'>Jurys</button>
      <button v-on:click='a_judges'>Juges</button>
      <button v-on:click='a_profs'>Professeur</button>
      <button v-on:click='a_rooms'>Salles</button>
      <button v-on:click='a_rollback'>Réinitialiser</button>
      <button v-on:click='logout'>Déconnexion</button>
    </div>

    <div name='content'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHomepage',
  methods: {
    logout() {
      this.$emit('logout')
    },
    a_students() {
      this.$emit('a_students')
    },
    a_jurys() {
      this.$emit('a_jurys')
    },
    a_judges() {
      this.$emit('a_judges')
    },
    a_profs() {
      this.$emit('a_profs')
    },
    a_rooms() {
      this.$emit('a_rooms')
    },
    a_rollback() {
      this.$emit('a_rollback')
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
