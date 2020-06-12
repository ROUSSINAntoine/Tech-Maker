<template>
  <div id='TechnologiesTable' class='text-center' >
    <h1 class='text-center'>Technologies par semestres</h1>

    <table style="border:2px solid black; margin-left: auto; margin-right: auto;">
      <thead>
        <tr>
          <th >Technologies</th>
          <th v-for='semester in semesters' v-bind:key='semester.id' >{{ semester.name }}</th>
          <th colspan="2" v-if='isAdmin'>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for='technology in technologies' v-bind:key='technology.id'>
          <td class='technologyItem, text-center' >
            <span v-if='selectedId !== technology.id'>{{ technology.name }}</span>

            <input
              type='text'
              v-model='selectedName'
              v-if='selectedId === technology.id && isAdmin && updateOrDelete'
              title='Nom de la technologie'
              placeholder='Nom de la technologie'
              required
            />
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

          <td v-if='isAdmin'>
            <button
              v-on:click="prepareUpdateTechnology(technology.id, technology.name)"
              v-if='selectedId !== technology.id'
            >Modifier</button>

            <button
              v-if='selectedId === technology.id && updateOrDelete'
              v-on:click='updateTechnology()'
            >Sauvegarder</button>
          </td>
          <td v-if='isAdmin'>
            <button
              v-on:click="prepareDeleteTechnology(technology.id, technology.name)"
              v-if='selectedId !== technology.id'
            >Supprimer</button>

            <button
              v-if='selectedId === technology.id'
              v-on:click='cancelUpdateOrDeleteTechnology()'
            >Annuler</button>
          </td>

        </tr>
      </tbody>
    </table>
    
    <span v-if='errorUpdateMessage !== null && selectedId !== null'>{{ errorUpdateMessage }}</span>

    <div  v-if="!updateOrDelete && selectedId !== null">
      <span>Êtes-vous sûr de vouloir supprimer la technologie: {{ selectedName }}</span>
      <button v-on:click="deleteTechnology()">Oui</button>
      <button v-on:click="cancelUpdateOrDeleteTechnology()">Non</button>
    </div>

    <v-btn v-on:click='sendIds()' color='#75b658' style='margin: 10px'>Sauvegarder</v-btn>
    <v-divider style='margin: 20px'></v-divider>
    <CreateTechnology v-if="isAdmin" v-on:create-technology="addTechnology" />

    <v-snackbar v-model="snackbar" :timeout="timeout">
      Vos technologies ont bien été enregistrées.
    </v-snackbar>
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
      snackbar: false,
      timeout: 5000,
      /** @type {Array.<{ id: Number, name: String, checkedIds: Array.<Number>, modifyIds: Array.<Number> }>} */
      semesters: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      technologies: [],
      /** @type {Number} */
      selectedId: null,
      /** @type {String} */
      selectedName: null,
      /**
       * If `true` is update mode, if `false` is delete mode.
       */
      updateOrDelete: true,
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
      : await getTechnologiesPerTeacher();

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
      /** @type {Array.<{   Id: Number, technologyId: Number, add: Boolean }>} */
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
        this.snackbar = true;
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
      this.updateOrDelete = true;
    },
    prepareDeleteTechnology (id, name) {
      this.selectedId = id;
      this.selectedName = name;
      this.updateOrDelete = false;
    },
    /**
     * Send technology's id to delete.
     * Emit data format is id: String
     */
    deleteTechnology () {
      deleteTechnology(this.selectedId);
      this.technologies = this.technologies.filter(techno => techno.id !== this.selectedId);
      this.semesters.forEach(semester => {
        semester.checkedIds = semester.checkedIds.filter(technoId => technoId !== this.selectedId);
        semester.modifyIds = semester.modifyIds.filter(technoId => technoId !== this.selectedId);
      });
      this.cancelUpdateOrDeleteTechnology();
    },
    cancelUpdateOrDeleteTechnology () {
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
        this.cancelUpdateOrDeleteTechnology();

      } else {
        this.technologies.find(techno => techno.id === this.selectedId).name = this.selectedName;
        updateTechnologyName(this.selectedId, this.selectedName);
        this.cancelUpdateOrDeleteTechnology();
      }
    },
    /**
     * Add new technology from the technology list.
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
  padding: 10px;
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
  background-color: #75b658 !important;
  border-radius: 5px;
}
</style>
