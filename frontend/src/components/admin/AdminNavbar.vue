<template>
  <div id='AdminNavbar'>

    <v-app-bar color='#75b658'
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Administrateur</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>

        <router-link :to='"/admin/studentCSV"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Étudiants</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to='/admin/projects' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-laptop</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Projets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link to='/admin/technologies' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-xml</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Technologies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!-- <router-link :to='"/admin/juges"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-tie</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Juges</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to='"/admin/juryCSV"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Jurys</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <router-link :to='"/admin/enseignants"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-teach</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Enseignants</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link> -->

        <router-link to='/admin/rooms' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-google-classroom</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Salles</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <v-spacer class=''></v-spacer>

        <v-btn style='margin:10px' color="red" v-on:click='disconnect'>Déconnexion</v-btn><br>
        <v-btn style='margin:10px' id='test' @click="snackbar = true" v-on:click="resetData()">Réinitialiser</v-btn><br>

        <v-btn style='width:100px; height:35px; margin:10px; color:black; background-color: white' v-if="$vuetify.theme.dark" @click='$vuetify.theme.dark = !$vuetify.theme.dark'>Clair</v-btn>
        <v-btn style='width:100px; height:35px; margin:10px; color:white; background-color: black' v-if="!$vuetify.theme.dark" @click='$vuetify.theme.dark = !$vuetify.theme.dark'>Sombre</v-btn>


      </v-list>
    </v-navigation-drawer>
    
    <v-snackbar v-model="snackbar" :timeout="timeout">
      La base de donnée a bien été réinitialisée.
    </v-snackbar>
  </div>
</template>

<style>
.routerlink {
  text-decoration:none;
}
</style>

<script>
import { logout, reset } from '../../services/services.js';

export default {
  name: 'AdminNavbar',
  methods: {
    async disconnect () {
      await logout();
      this.$router.push('/login');
    },
    async resetData () {
      await reset();
    }
  },
  data: () => ({
    snackbar: false,
    timeout: 5000,
    switch1: true,
    drawer: null
  }),

}
</script>