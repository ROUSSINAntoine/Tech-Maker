<template>
  <div id="login">
    <div style='margin-left: 400px; margin-right: 400px'>
      <v-alert color='#75b658'>
        <h1 style='margin-bottom:30px' class='text-center'>Connexion</h1>
        <v-flex class="text-xs-center">
          <v-text-field
            color='white'
            v-model='email'
            dense
            label="Adresse mail"
            required
            ></v-text-field>

            <v-text-field
              color='white'
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              v-model='password'
              dense
              label='Mot de passe'
              required
            ></v-text-field>
            <v-divider style='margin:10px'></v-divider>
            <v-row justify="center" align="center">
              <v-btn v-on:click="sendData" >Se connecter</v-btn>

              <v-alert style='margin:10px' v-if="error !== null" type="error">
                {{error}}
              </v-alert>
            </v-row>
        </v-flex>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { postLogin } from '../services/services.js';

export default {
  name: 'Login',
  data() {
    return {
      show1: false,
      drawer: null,
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
