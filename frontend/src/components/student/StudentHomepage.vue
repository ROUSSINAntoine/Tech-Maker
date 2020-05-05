<template>
  <div class="StudentHomepage">
    <h1>Espace étudiant</h1>
    
    <h2>{{ name }}</h2>

    <h2>Image (WIP)</h2>

    <h2>Slogan</h2>
    <p>{{ slogan }}</p>
    
    <h2>Description</h2>
    <p>{{ describe }}</p>
    
    <h2>Technologies</h2>
    <ul>
      <li 
        v-for='technologie in technologies' 
        v-bind:key='technologie.id'
      >{{ technologie }}</li>
    </ul>

    <router-link to='./StudentForm' tag='button'>Modifier</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'StudentHomepage',
  props: {
  },
  data () {
    return {
      name: 'TechMaker',
      slogan: 'Tech\'Maker pour un Tech\'Day meilleur !',
      describe: 'Tech\'Maker est une solution web pour faciliter l\'organisation du Tech\'Day, un forum organisé par IN\'TECH dans le but de présenter les projets informatiques de ses étudiants à de nombreux intervenants externes. Cette solution permet la création des équipes de jurys, assignation des stands, organiser cet événement n\'aura jamais été aussi simple !',
      technologies: ['Javascript', 'Vue.js', 'PostgreSQL']
    };
  },
  methods: {
    editForm() {
      this.$emit('editForm')
    }
  }
}
</script>