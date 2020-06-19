<template>
  <div id='CreateTechnology'>

  <span>
    <v-card class="mx-auto" max-width="500px">
      <v-card-title style='background-color:#75b658'>Ajouter une technologie</v-card-title>
        <v-text-field
          v-on:keyup.enter="sendTechnology()"
          style='margin:20px'
          v-model="technologyName"
          required
          label="Nom de la technologie"
          dense
        ></v-text-field>
        <v-divider style='margin-left:30px; margin-right:30px'></v-divider>
        <v-card-actions>
          <v-row
          align="center"
          justify="center">
            <v-btn v-on:click='sendTechnology()' color='#75b658' style='margin: 10px'>Sauvegarder</v-btn><br>
            <label v-if='errorMessage'>{{ errorMessage }}</label>
          </v-row>
        </v-card-actions>
    </v-card>
  </span>
  </div>
</template>

<script>
import { createTechnology } from '../../services/services.js';

export default {
  name: 'CreateTechnology',
  data() {
    return {
      errorMessage : null,
      technologyName: null/*,
      technologyId: null*/
    };
  },
  methods: {
    async sendTechnology () {
      if (this.technologyName === null || this.technologyName.trim().length === 0) {
        this.errorMessage = 'Le champ doit être rempli.';
      } else {
        const resp = await createTechnology(this.technologyName.trim());

        if (resp.error === undefined || resp.error === null) {
          this.$emit('create-technology', { id: resp.id, name: resp.name });
          this.errorMessage = null;
          this.technologyName = null;
        
        } else {
          this.errorMessage = resp.error;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* input {
  padding: 10px;
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: 1px solid #999999;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
button {
  padding: 10px;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 0px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
} */
</style>
