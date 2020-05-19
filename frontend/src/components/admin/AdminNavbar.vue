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
      <router-link to='/login'><button>Déconnexion</button></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AdminNavbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
