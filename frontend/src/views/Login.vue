<template>
  <div id="login">
    <input v-model="email" type="email" placeholder="Mail" required />
    <input v-model="password" type="password" placeholder="Mot de passe" required />
    <button v-on:click="sendData" type="submit">Envoyer</button>
    <p v-if="error !== null">{{ error }}</p>
  </div>
</template>

<script>
import { postLogin } from '../services/services.js';

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  methods: {
    /**
     * @param {string} email
     * @param {string} password
     */
    async sendData() {
      if (!this.email) {
        this.error = "Le mail doit être complété.";

      } else if (this.email.match(/^[\w!#$%&'*+/=?^_`{|}~-]+(\.[\w!#$%&'*+/=?^_`{|}~-]+)*@((\w((\w|-)*\w)?\.)+\w((\w|-)*\w)*|\[(([01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}([01]?\d{1,2}|2[0-4]\d|25[0-5])\])$/) === null) {
        this.error = "Le format du mail est invalide.";

      } else if (!this.password) {
        this.error = "Le mot de passe doit être complété.";

      } else {
        const response = await postLogin(this.email, this.password);
        if (response.route) {
          this.$router.push(`/${response.route}`);

        } else {
          this.error = response.error;
          this.password = null;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
