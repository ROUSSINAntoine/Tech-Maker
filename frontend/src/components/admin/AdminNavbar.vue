<template>
  <div id='AdminNavbar'>
    <nav>
      <ul>
        <li><router-link :to='"/admin/" + $route.params.id + "/students"'><button>Étudiants</button></router-link></li>
        <!--li><router-link :to='"/admin/" + $route.params.id + "/projects"'><button>Projets</button></router-link></li-->
        <li><router-link :to='"/admin/" + $route.params.id + "/technologies"'><button>Technologies</button></router-link></li>
        <!--li><router-link :to='"/admin/" + $route.params.id + "/juges"'>Juges</router-link></li>
        <li><router-link :to='"/admin/" + $route.params.id + "/jury"'>Jury</router-link></li>
        <li><router-link :to='"/admin/" + $route.params.id + "/enseignants"'>Enseignants</router-link></li>
        <li><router-link :to='"/admin/" + $route.params.id + "/rooms"'>Salles</router-link></li-->
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
