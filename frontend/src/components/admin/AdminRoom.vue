<template>
  <div id="app">
    <div name='navbar'>
      <button v-on:click='a_students'>Étudiants</button>
      <button v-on:click='a_jurys'>Jurys</button>
      <button v-on:click='a_judges'>Juges</button>
      <button v-on:click='a_profs'>Professeur</button>
      <button v-on:click='a_rooms'>Salles</button>
      <button v-on:click='a_rollback'>Réinitialiser</button>
      <button v-on:click='logout'>Déconnexion</button>
    </div>
    <AdminRoomTable/>
  </div>
</template>

<script>
import { AdminRoomTable } from "./AdminRoomTable.vue";
export default {
  name: 'AdminRoom',
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