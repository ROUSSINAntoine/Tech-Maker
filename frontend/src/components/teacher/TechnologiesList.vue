<template>
  <div id='TechnologiesList'>
    <ul v-for='semester in semesters' v-bind:key='semester.id'>
      <li>
        <h1>Technologie de {{ semester.name }}</h1>
        <ul v-for='technology in technologies' v-bind:key='technology.id'>
          <li class='technologyItem'>
            <input
              v-model='semester.ckeckedIds'
              type='checkbox'
              :id='semester.id + "-" + technology.id'
              :value='technology.id'
              class='technology'
            />
            <label
              :for='semester.id + "-" + technology.id'
              v-if='selectedId !== technology.id'
            >{{ technology.name }}</label>

            <input
              type='text'
              v-model='selectedName'
              v-if='selectedId === technology.id'
              title='Nom de la technologie'
              placeholder='Nom de la technologie'
              required
            />
            <button v-if='selectedId === technology.id' v-on:click='updateTechnology()'>Sauvegarder</button>
            <button v-if='selectedId === technology.id' v-on:click='cancelUpdateTechnology()'>Annuler</button>
            <span v-if='errorUpdateMessage !== null && selectedId === technology.id'>{{ errorUpdateMessage }}</span>

            <button
              v-on:click='prepareUpdateTechnology(technology.id, technology.name)'
              v-if='selectedId !== technology.id'
              class='technologyAction'
            >Modifier</button>
            <button
              v-on:click='deleteTechnology(technology.id)'
              v-if='selectedId !== technology.id'
              class='technologyAction'
            >Supprimer</button>
          </li>
        </ul>
      </li>
    </ul>
    <button v-on:click='sendIds()'>Sauvegarder</button>
  </div>
</template>

<script>
export default {
  name: 'TechnologiesList',
  data() {
    return {
      semesters: [
        {
          id: 1,
          name: 'S4 IL',
          ckeckedIds: []
        },
        {
          id: 2,
          name: 'S4 SR',
          ckeckedIds: []
        }
      ],
      technologies: [
        {
          id: 1,
          name: 'C#'
        },
        {
          id: 2,
          name: 'JavaScript'
        },
        {
          id: 3,
          name: 'PHP'
        },
        {
          id: 4,
          name: 'SQL'
        }
      ],
      selectedId: null,
      selectedName: null,
      errorUpdateMessage: null
    }
  },
/*  props: {
    technologyUpdateName: String,
    technologyUpdateId: Number
  },*/
  methods: {
    sendIds () {
      console.log(this.semesters);
    },
    /**
     * @param {number} id Id of the technology
     * @param {string} name Name of the technology
     */
    prepareUpdateTechnology (id, name) {
      console.log(id, name);
      this.selectedId = id;
      this.selectedName = name;
    },
    deleteTechnology (id) {
      console.log(id);
      this.technologies = this.technologies.filter(techno => techno.id !== id);
    },
    cancelUpdateTechnology () {
      this.selectedId = null;
      this.selectedName = null;
      this.errorUpdateMessage = null;
    },
    updateTechnology () {
      if (this.selectedName === null || this.selectedName.trim() === '') {
        this.errorUpdateMessage = 'Le nom ne doit pas être laissé vide.';
        console.log('rt');
      } else {
        console.log(this.selectedName);
        this.technologies.find(techno => techno.id === this.selectedId).name = this.selectedName;
        this.cancelUpdateTechnology();
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
}
.technologyAction {
  display: none;
}
.technologyItem:hover > .technologyAction {
  display: inline;
}
</style>
