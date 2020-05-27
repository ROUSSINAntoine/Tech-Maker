<template>
  <v-app id="app">

    <v-content>
      <router-view style='margin: 20px'></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>