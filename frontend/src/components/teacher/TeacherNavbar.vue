<template>
  <div id='TeacherNavbar'>
    <nav>
      <ul>
        <li><button>Mes étudiants</button></li>
        <li><button>Projets</button></li>
        <li><button>Technologies</button></li>
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
