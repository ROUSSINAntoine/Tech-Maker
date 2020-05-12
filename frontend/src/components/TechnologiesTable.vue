<template>
  <div id='TechnologiesTable'>
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
              v-if='selectedId !== technology.id && isAdmin'
              class='technologyAction'
            >Modifier</button>
            <button
              v-on:click='deleteTechnology(technology.id)'
              v-if='selectedId !== technology.id && isAdmin'
              class='technologyAction'
            >Supprimer</button>

            <input
              type='text'
              v-model='selectedName'
              v-if='selectedId === technology.id && isAdmin'
              title='Nom de la technologie'
              placeholder='Nom de la technologie'
              required
            />
            <button v-if='selectedId === technology.id && isAdmin' v-on:click='updateTechnology()'>Sauvegarder</button>
            <button v-if='selectedId === technology.id && isAdmin' v-on:click='cancelUpdateTechnology()'>Annuler</button>
            <span v-if='errorUpdateMessage !== null && selectedId === technology.id'>{{ errorUpdateMessage }}</span>
            
          </td>
          <td v-for='semester in semesters' v-bind:key='semester.id'>
            <div class='cell'>
              <input
                type='checkbox'
                v-model='semester.modifyIds'
                :id='semester.id + "-" + technology.id'
                :value='technology.id'
                class='technologySelector'
              />
              <label :for='semester.id + "-" + technology.id' class="checker">a</label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button v-on:click='sendIds()'>Sauvegarder</button>
  </div>
</template>

<script>
import {
  getTechnologiesPerTeacher,
  getAllTechnologies,
  setModifiedTechnologiesPerSemester,
  updateTechnologyName,
  deleteTechnology
} from '../services/services.js';

export default {
  name: 'TechnologiesTable',
  data() {
    return {
      semesters: [],
      technologies: [],
      selectedId: null,
      selectedName: null,
      errorUpdateMessage: null
    }
  },
  async created() {
    const data = this.isAdmin
      ? await getAllTechnologies()
      : await getTechnologiesPerTeacher(this.$route.params.id);
    this.semesters = data.semesters.map(semester => {
      return { ...semester, modifyIds: [...semester.checkedIds] };
    });
    this.technologies = data.technologies;
  },
  props: {
    isAdmin: Boolean,
  },
  methods: {
    /**
     * Send list of technologies per semester.
     * Emit data format is Array<Object(id: Number, name: String, ckeckedIds: Array<Number>)>
     */
    sendIds () {
      const updateList = [];
      let copyModifyIds;

      for (const semester of this.semesters) {
        copyModifyIds = [...semester.modifyIds];

        semester.checkedIds.forEach(oldId => {
          if (!copyModifyIds.includes(oldId)) {
            updateList.push({
              semesterId: semester.id,
              technologyId: oldId,
              add: false
            });
          } else {
            copyModifyIds = copyModifyIds.filter(id => id !== oldId);
          }
        });

        copyModifyIds.forEach(id => updateList.push({
          semesterId: semester.id,
          technologyId: id,
          add: true
        }));
      }

      setModifiedTechnologiesPerSemester(updateList);
    },
    /**
     * Prepare selectedId et selectedName.
     * @param {Number} id Id of the technology
     * @param {String} name Name of the technology
     */
    prepareUpdateTechnology (id, name) {
      this.selectedId = id;
      this.selectedName = name;
    },
    /**
     * Send technology's id to delete.
     * Emit data format is id: String
     */
    deleteTechnology (id) {
      console.log(id);
      deleteTechnology(id);
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
      } else {
        this.technologies.find(techno => techno.id === this.selectedId).name = this.selectedName;
        updateTechnologyName(this.selectedId, this.selectedName);
        this.cancelUpdateTechnology();
        this.semesters.forEach(s => {
          s.checkedIds = [ ...s.modifyIds ],
          s.modifyIds = []
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.technologyAction {
  display: none;
}
.technologyItem:hover > .technologyAction {
  display: inline;
}

table {
  border-collapse: collapse;
}
th, td {
  border: 1px solid black;
  margin: 0px;
  padding: 0px;
}

.cell {
  display: table;
  width: 100%;
  height: 100%;
}

.checker {
  display: table-cell;
  cursor: pointer;
  min-width: 100%;
  width: 100%;
  color: transparent;
  
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.checker:hover {
  background-color: #CCC;
}

.technologySelector {
  position: absolute;
  left: -200px;
  opacity: 0;
}

.technologySelector:checked + .checker {
  background-color: #00aa00 !important;
}
</style>
