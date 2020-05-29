<template>
  <div id='TeacherNavbar'>
    <nav>
      <ul>
        <!--li><router-link :to='"/teacher/students"'><button>Mes étudiants</button></router-link></li-->
        <li><router-link :to='"/teacher/projects"'><button>Projets</button></router-link></li>
        <li><router-link :to='"/teacher/technologies"'><button>Technologies</button></router-link></li>
      </ul>
      <button v-on:click='disconnect'>Déconnexion</button>
    </nav>
  </div>
</template>

<script>
import { logout } from '../../services/services.js';

export default {
  name: 'TeacherNavbar',
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
