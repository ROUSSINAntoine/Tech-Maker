<template>
  <div class="NotFound">
    <v-img :src="imgSrc" max-width="300" style="margin: auto;" />
    <v-alert color="red" style="text-align: center;">
      <h1>404 Not Found</h1>
    </v-alert>

    <v-btn v-on:click="disconnect">Retourner au login</v-btn>
  </div>
</template>

<script>
import { logout } from '../services/services.js';

export default {
  name: 'NotFound',
  data () {
    return {
      imgSrc: require('../assets/cirno_shrug.png')
    }
  },
  methods: {
    async disconnect () {
      await logout();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
</style>
