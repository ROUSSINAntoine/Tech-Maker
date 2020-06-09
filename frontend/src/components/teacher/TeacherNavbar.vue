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

        <router-link :to='"/teacher/projects"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-laptop</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Projets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to='"/teacher/technologies"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-xml</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Technologies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
         <v-btn style='margin:10px' color="red" v-on:click="disconnect">Déconnexion</v-btn><br>

              <v-btn style='width:100px; height:35px; margin:10px; color:black; background-color: white' v-if="$vuetify.theme.dark" @click='$vuetify.theme.dark = !$vuetify.theme.dark'>Clair</v-btn>
              <v-btn style='width:100px; height:35px; margin:10px; color:white; background-color: black' v-if="!$vuetify.theme.dark" @click='$vuetify.theme.dark = !$vuetify.theme.dark'>Sombre</v-btn>
      
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import { logout } from '../../services/services.js';

export default {
  name: 'TeacherNavbar',
  data: () => ({
    switch1: true,
      drawer: null
    }),
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
