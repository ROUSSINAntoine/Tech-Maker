<template>
  <div id='CreateProject'>
    <h1 class='text-center'>Créer un nouveau projet</h1>

    <v-row>
      <v-col cols="12" sm="5" md='4'>
        <v-text-field
          v-model="projectName"
          required
          label="Nom du projet"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>

    <v-radio-group v-model="radios" :mandatory="false">
      <v-radio v-for='semester in semesters' v-bind:key='semester.id'
      :label='semester.name'
      v-model='semesterId'
      name='semester'></v-radio>
    </v-radio-group>
    
    <input
      v-model='projectName'
      type='text'
      placeholder='Nom du projet'
      required
    />

    <h2>Semestres</h2>
    <ul v-for='semester in semesters' v-bind:key='semester.id' >
      <li>
        <input
          v-model='semesterId'
          v-on:change="changeSemester()"
          type='radio'
          name="semester"
          :id='semester.id'
          :value='semester.id'
          required
        />
        <label :for='semester.id'>{{ semester.name }}</label>
      </li>
    </ul>

    <h2>Members</h2>
    <div v-if="students.length > 0">
      <ul v-for="student in students" v-bind:key="student.name">
        <li v-if="members.includes(student.id)">
          <span>{{ student.name }}</span>
          <span v-if="projectManager === student.id">(Chef)</span>
          <button v-on:click="removeMember(student.id)">Retirer</button>

          <button
            v-on:click="projectManager = student.id"
            v-if="projectManager !== student.id"
          >Chef de projet</button>

          <button
          v-if="projectManager === student.id"
          v-on:click="projectManager = null"
        >Retirer chef</button>
        </li>
      </ul>
      
      <button
        v-if="!selectStudent"
        v-on:click="selectStudent = true"
      >Ajouter des membres au projet</button>
      
      <div v-else>
        <ul v-for="student in students" v-bind:key="student.name">
          <li v-if="!members.includes(student.id)">
            <button v-on:click="addMember(student.id)">{{ student.name }}</button>
          </li>
        </ul>
        <button v-on:click="selectStudent = false">Annuler</button>
      </div>
    </div>

    <button v-on:click='saveProject()'>Enregistrer</button>
    <span v-if='errorMessage !== null'>{{ errorMessage }}</span>
  </div>
</template>

<script>
import {
  createProject,
  getSemestersPerTeacher,
  getAllSemestersName,
  getStudentsPerSemester
} from '../../services/services.js';

export default {
  name: 'CreateProject',
  data() {
    return {
      /** @type {String} */
      projectName: null,
      /** @type {String} */
      errorMessage: null,
      /** @type {Number} */
      semesterId: null,
      /** @type {Array.<{ id: Number, name: String }>} */
      semesters: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      students: [],
      /** @type {Array.<Number>} */
      members: [],
      selectStudent: false,
      /** @type {Number} */
      projectManager: null
    };
  },
  async created () {
    /** @type {String} */
    const userType = this.$route.path.split('/')[1];
    this.semesters = userType === 'teacher'
      ? await getSemestersPerTeacher(this.$route.params.id)
      : await getAllSemestersName();
  },
  methods: {
    removeMember (memberId) {
      this.members = this.members.filter(member => member !== memberId);
      if (this.projectManager === memberId) {
        this.projectManager = null;
      }
    },
    addMember (studentId) {
      this.members.push(studentId);
      this.selectStudent = false;
    },
    async changeSemester () {
      this.students = await getStudentsPerSemester(this.semesterId);
      this.projectManager = null;
      this.members = [];
    },
    async saveProject () {
      if (this.projectName === null || this.projectName === '') {
        this.errorMessage = 'Le nom du projet ne doit pas être laissé vide.';

      } else if (this.semesterId === null) {
        this.errorMessage = 'Un semester doit être selectionné';

      } else if (this.members.length === 0) {
        this.errorMessage = 'Il doit y avoir au moins un membre dans le projet.';

      } else {
        /** @type {{ id: Number, name: String, error?: String }} */
        const success = await createProject(this.projectName, this.members, this.projectManager)
        console.log(success);
        if (success.error === undefined || success.error === null) {
          console.log('created');
          this.$emit('created-project', { id: success.id, name: success.name, semesterId: this.semesterId });
          this.errorMessage = null;
          this.projectName = null;
          this.members = [];
          this.projectManager = null;
          this.semesterId = null;
        } else {
          this.errorMessage = success.error;
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
