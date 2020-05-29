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

        <router-link :to='"/admin/" + $route.params.id + "/students"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Étudiants</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!-- <router-link :to='"/admin/" + $route.params.id + "/projects"' class='routerlink'> -->
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-laptop</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Projets</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->

        <router-link :to='"/admin/" + $route.params.id + "/technologies"' class='routerlink'>
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-xml</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Technologies</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>

        <!-- <router-link :to='"/admin/" + $route.params.id + "/juges"' class='routerlink'> -->
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-tie</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Juges</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->

        <!-- <router-link :to='"/admin/" + $route.params.id + "/jury"' class='routerlink'> -->
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-group</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Jurys</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->

        <!-- <router-link :to='"/admin/" + $route.params.id + "/enseignants"' class='routerlink'> -->
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-teach</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Enseignants</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->

        <!-- <router-link :to='"/admin/" + $route.params.id + "/rooms"' class='routerlink'> -->
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-google-classroom</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Salles</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        <!-- </router-link> -->

        <v-spacer class=''></v-spacer>

          <v-list-item link>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <router-link to='/login' class='routerlink'><v-btn color='red'>Déconnexion</v-btn></router-link>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link>
            <v-list-item-action></v-list-item-action>
            <v-list-item-content>
              <v-btn id='test'>Réinitialiser</v-btn>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style>
.routerlink {
  text-decoration:none;
}
</style>

<script>
export default {
  name: 'AdminNavbar',
  data: () => ({
    switch1: true,
      drawer: null
    }),
}
</script>