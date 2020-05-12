<template>
  <div id='TeacherNavbar'>
    <nav>
      <ul>
        <li><router-link :to='"/teacher/" + $route.params.id +  "/students"'><button>Mes étudiants</button></router-link></li>
        <li><router-link :to='"/teacher/" + $route.params.id +  "/projects"'><button>Projets</button></router-link></li>
        <li><router-link :to='"/teacher/" + $route.params.id +  "/technologies"'><button>Technologies</button></router-link></li>
      </ul>
      <router-link to='/login'><button>Déconnexion</button></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TeacherNavbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
