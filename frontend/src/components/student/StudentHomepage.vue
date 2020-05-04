<template>
  <div class="studentHomePage">
    <div class="form">
      <h1>Mon projet</h1>

      <label for="name"><h2>Nom du projet</h2></label>
      <input v-model="name" type="text" id="name">

      <label for="slogan"><h2>slogan</h2></label>
      <input v-model="slogan" type="text" name="slogan" id="slogan">

      <label for="describe"><h2>describe</h2></label>
      <textarea v-model="describe" id ="describe"></textarea>

      <label for="image"><h2>image (WIP)</h2></label>
      <input v-on:change="image" disabled type="file" name="image" id="image">

      <h2>technologies</h2>
      <input type="checkbox" value="Vue.js" id="Vue.js" v-model="technologies">
      <label for="Vue.js">Vue.js</label><br>
      <input type="checkbox" value="Postgress" id="Postgress" v-model="technologies">
      <label for="Postgress">Postgress</label><br>
      <input type="checkbox" value="PHP" id="PHP" v-model="technologies">
      <label for="PGP">PHP</label>

      <span> {{ technologies }} </span>

      <h2>Membres</h2>
      <p>WIP</p>

      <button v-on:click="submitForm" type="submit">Envoyer</button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'StudentHomepage',
  props: {
  },
  data () {
    return {
      technologies: [],
      name: null,
      slogan: null,
      describe: null,
      image: null,
    };
  },
  methods: {
    /**
     *  @param {string} name
     *  @param {string} slogan
     *  @param {string} describe
     *  @param {string} image
     *  @param {string} technologies
     */
    submitForm() {
      console.log(this.name + " " + this.slogan + " " + this.describe + " " + this.image);
      for (let i = 0; i < this.technologies.length; i++) {
        console.log(this.technologies[i]);
      }
      this.$emit("editProject", {
        name: this.name,
        slogan: this.slogan,
        describe: this.describe, 
        image: this.image,
        technologies: this.technologies
      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
