<template>
  <div id='AdminNavbar'>
    <nav>
      <ul>
        <li><router-link :to='"/admin/students"'><button>Étudiants</button></router-link></li>
        <!--li><router-link :to='"/admin/projects"'><button>Projets</button></router-link></li-->
        <li><router-link :to='"/admin/technologies"'><button>Technologies</button></router-link></li>
        <!--li><router-link :to='"/admin/juges"'>Juges</router-link></li>
        <li><router-link :to='"/admin/jury"'>Jury</router-link></li>
        <li><router-link :to='"/admin/enseignants"'>Enseignants</router-link></li>
        <li><router-link :to='"/admin/rooms"'>Salles</router-link></li-->
      </ul>
      <button>Réinitialiser</button>
      <button v-on:click='disconnect'>Déconnexion</button>
    </nav>
  </div>
</template>

<script>
import { logout } from '../../services/services.js';

export default {
  name: 'AdminNavbar',
  methods: {
    async disconnect () {
      await logout();
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
