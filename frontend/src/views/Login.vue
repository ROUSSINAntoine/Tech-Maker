<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          align="center"
          justify="center"
          style="height: 300px;"
        >
          <v-card style='width:350px'>
            <v-card-title style='background-color:#75b658'>Connexion</v-card-title>
            <div style='margin:20px'>
              <v-text-field
                v-model='email'
                dense
                label="Adresse mail"
                required
                ></v-text-field>

                <v-text-field
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
                  <v-btn color='#75b658' v-on:click="sendData" >Se connecter</v-btn>

                  <v-alert style='margin:10px' v-if="error !== null" type="error">
                    {{error}}
                  </v-alert>
                </v-row>
              </div>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
