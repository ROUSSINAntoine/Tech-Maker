<template>
  <div class="NotFound">
    <h1>404 NotFound</h1>

    <button v-on:click="disconnect">Retourner au login</button>
  </div>
</template>

<script>
import { logout } from '../services/services.js';

export default {
  name: 'NotFound',
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
