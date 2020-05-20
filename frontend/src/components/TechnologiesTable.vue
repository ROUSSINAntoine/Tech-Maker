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
            
            <button
              v-if='selectedId === technology.id && isAdmin'
              v-on:click='updateTechnology()'
            >Sauvegarder</button>
            
            <button
              v-if='selectedId === technology.id && isAdmin'
              v-on:click='cancelUpdateTechnology()'
            >Annuler</button>
            
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

    <CreateTechnology v-if="isAdmin" v-on:create-technology="addTechnology" />
  </div>
</template>

<script>
import CreateTechnology from '../components/admin/CreateTechnology.vue';

import {
  getTechnologiesPerTeacher,
  getAllTechnologies,
  setModifiedTechnologiesPerSemester,
  updateTechnologyName,
  deleteTechnology
} from '../services/services.js';

export default {
  name: 'TechnologiesTable',
  components: {
    CreateTechnology
  },
  data() {
    return {
      /** @type {Array.<{ id: Number, name: String, checkedIds: Array.<Number>, modifyIds: Array.<Number> }>} */
      semesters: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      technologies: [],
      /** @type {Number} */
      selectedId: null,
      /** @type {String} */
      selectedName: null,
      /** @type {String} */
      errorUpdateMessage: null,
      isAdmin: false
    }
  },
  async created() {
    this.isAdmin = this.$route.path.split('/')[1] === 'admin';
    /**
     * @type {
     *  semesters: { Arra.<{ id: Number, name: String, checkedIds: Array.<Number> }> },
     *  technologies: Array.<{ id: Number, name: String }>
     * }
     */
    const data = this.isAdmin
      ? await getAllTechnologies()
      : await getTechnologiesPerTeacher(this.$route.params.id);

    this.semesters = data.semesters.map(semester => {
      return { ...semester, modifyIds: [...semester.checkedIds] };
    });
    
    this.technologies = data.technologies;
  },
  methods: {
    /**
     * Send list of technologies per semester.
     * Emit data format is Array<Object(id: Number, name: String, ckeckedIds: Array<Number>)>
     */
    sendIds () {
      this
      /** @type {Array.<{ semesterId: Number, technologyId: Number, add: Boolean }>} */
      const updateList = [];
      /** @type {Array.<Number>} */
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

        semester.checkedIds = semester.modifyIds;
      }

      if (updateList.length > 0) {
        setModifiedTechnologiesPerSemester(updateList);
        this.semesters.forEach(s => {
          s.checkedIds = [ ...s.modifyIds ]
        });
      }
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
      deleteTechnology(id);
      this.technologies = this.technologies.filter(techno => techno.id !== id);
      this.semesters.forEach(semester => {
        semester.checkedIds = semester.checkedIds.filter(technoId => technoId !== id);
        semester.modifyIds = semester.modifyIds.filter(technoId => technoId !== id);
      });
    },
    cancelUpdateTechnology () {
      this.selectedId = null;
      this.selectedName = null;
      this.errorUpdateMessage = null;
    },
    updateTechnology () {
      const name = this.selectedName.trim();
      if (name === null || name === '') {
        this.errorUpdateMessage = 'Le nom ne doit pas être laissé vide.';

      } else if (this.technologies.filter(techno => techno.id !== this.selectedId).find(techno => techno.name.toLowerCase() === name.toLowerCase()) !== undefined) {
        this.errorUpdateMessage = 'Une technologie a déjà ce nom.';
      
      } else if (this.technologies.find(techno => techno.id === this.selectedId).name !== name){
        updateTechnologyName(this.selectedId, name);
        this.technologies.find(techno => techno.id === this.selectedId).name = name;
        this.cancelUpdateTechnology();

      } else {
        this.technologies.find(techno => techno.id === this.selectedId).name = this.selectedName;
        updateTechnologyName(this.selectedId, this.selectedName);
        this.cancelUpdateTechnology();
      }
    },
    /**
     * Add new technolgy from the technology list.
     * @param {{ id: Number, name: String }} techno New technology data
     */
    addTechnology (techno) {
      this.technologies.push(techno);
      this.technologies.sort((tA, tB) => tA.name.toLowerCase() < tB.name.toLowerCase()
        ? -1
        : tA.name.toLowerCase() === tB.name.toLowerCase()
          ? 0
          : 1
      );
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
