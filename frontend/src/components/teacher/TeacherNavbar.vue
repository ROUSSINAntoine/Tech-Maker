<template>
<div id='AdminNavbar'>

    <v-app-bar color='#75b658'
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Professeur</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>

        <router-link :to='"/teacher/" + $route.params.id +  "/projects"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-laptop</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Projets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to='"/teacher/" + $route.params.id +  "/technologies"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-xml</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Technologies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <router-link to='/login' class='routerlink'><v-btn color='red'>Déconnexion</v-btn></router-link>
            </v-list-item-content>
          </v-list-item>
          
        </router-link>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
export default {
  name: 'TeacherNavbar',
  data: () => ({
    switch1: true,
      drawer: null
    }),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
