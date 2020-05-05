<template>
  <div id='TechnologiesList'>
    <h1>Technologies utilisables par semestres</h1>
    <table>
      <thead>
        <tr>
          <th>Technologies</th>
          <th v-for='semester in semesters' v-bind:key='semester.id'>{{ semester.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='technology in technologies' v-bind:key='technology.id'>
          <td class='technologyItem'>
            <span v-if='selectedId !== technology.id'>{{ technology.name }}</span>
            <button
              v-on:click='prepareUpdateTechnology(technology.id, technology.name)'
              v-if='selectedId !== technology.id && modifyTechno'
              class='technologyAction'
            >Modifier</button>
            <button
              v-on:click='deleteTechnology(technology.id)'
              v-if='selectedId !== technology.id && modifyTechno'
              class='technologyAction'
            >Supprimer</button>

            <input
              type='text'
              v-model='selectedName'
              v-if='selectedId === technology.id && modifyTechno'
              title='Nom de la technologie'
              placeholder='Nom de la technologie'
              required
            />
            <button v-if='selectedId === technology.id && modifyTechno' v-on:click='updateTechnology()'>Sauvegarder</button>
            <button v-if='selectedId === technology.id && modifyTechno' v-on:click='cancelUpdateTechnology()'>Annuler</button>
            <span v-if='errorUpdateMessage !== null && selectedId === technology.id'>{{ errorUpdateMessage }}</span>

            
          </td>
          <td v-for='semester in semesters' v-bind:key='semester.id'>
            <input
              type='checkbox'
              v-model='semester.ckeckedIds'
              :id='semester.id + "-" + technology.id'
              :value='technology.id'
              class='technologyPerSemester'
            />
            <div class='checkboxLabel' :for='semester.id + "-" + technology.id'></div>
          </td>
        </tr>
      </tbody>
    </table>
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
  props: {
    modifyTechno: Boolean
  },
  methods: {
    /**
     * Send list of technologies per semester.
     * Emit data format is Array<Object(id: Number, name: String, ckeckedIds: Array<Number>)>
     */
    sendIds () {
      console.log(this.semesters);
    },
    /**
     * Prepare selectedId et selectedName.
     * @param {Number} id Id of the technology
     * @param {String} name Name of the technology
     */
    prepareUpdateTechnology (id, name) {
      console.log(id, name);
      this.selectedId = id;
      this.selectedName = name;
    },
    /**
     * Send technology's id to delete.
     * Emit data format is id: String
     */
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

th, td {
  border: 1px solid black;
  padding: 3px;
}
table {
  border-collapse: collapse;
}

td {
  padding: 0px;
}
</style>
