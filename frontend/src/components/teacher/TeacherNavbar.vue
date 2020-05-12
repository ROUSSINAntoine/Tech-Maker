<template>
  <div id='TeacherNavbar'>
    <nav>
      <ul>
        <li><router-link to='etudiants'><button>Mes étudiants</button></router-link></li>
        <li><router-link to='projects'><button>Projets</button></router-link></li>
        <li><router-link to='technologies'><button>Technologies</button></router-link></li>
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
