<template>
  <div id='CreateProject'>
  
    <v-card style='margin:50px' class="mx-auto" max-width="500">
      <v-card-title style='background-color:#75b658'>Créer un projet</v-card-title>
      <v-card-actions>
          <v-text-field
            v-model="projectName"
            required
            dense
            label="Nom du projet"
          ></v-text-field>
      </v-card-actions>
      <v-divider style='margin-left:30px; margin-right:30px'></v-divider>
      <v-card-action>
        <v-card-title>Semestre</v-card-title>
      </v-card-action>
      <v-card-actions>
        <v-radio-group 
          v-model="semesterId"
          v-on:change="changeSemester()"
          >
            <v-radio 
            v-for="semester in semesters" v-bind:key="semester.id" 
            name="semester" 
            :label="semester.name" 
            :value="semester.id"
            ></v-radio>
          </v-radio-group>
      </v-card-actions>
        
      <v-card-actions>
        <v-card-title>Membres</v-card-title>
      </v-card-actions>
      <v-card-action>
        <v-list-item-group v-model="item" color="primary">
          <div v-if="students.length > 0">
            <v-list-item 
              inactive='true' 
              style='cursor:pointer'
              v-for="student in students.filter(s => members.includes(s.id))" v-bind:key="student.name"
            >
              <v-list-item-icon>
                <v-btn
                  v-on:click="projectManager = student.id" 
                  v-if="projectManager !== student.id" 
                  text
                ><v-icon>star</v-icon>
                </v-btn>
                <v-btn
                  v-else
                  v-on:click="projectManager = null" text
                ><v-icon color='yellow'>star</v-icon></v-btn>
              </v-list-item-icon>
              <v-list-item-content>
                <div>
                  <v-list-item-title 
                    v-text="student.name"
                  ></v-list-item-title>
                  <h5 v-if="projectManager === student.id">Chef de projet</h5>
                  <h5 v-else>Membre</h5>
                </div>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-btn 
                  text 
                  v-on:click="removeMember(student.id)"><v-icon>close</v-icon></v-btn>
              </v-list-item-avatar>
            </v-list-item>
          </div>
        </v-list-item-group>
        <v-btn 
          v-if="semesterId != null" 
          v-on:click="selectStudent = true" 
          @click.stop="dialog = true" 
          style='margin:10px'>Ajouter un membre
        </v-btn>
        <v-dialog
          v-model="dialog"
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">Liste des étudiants</v-card-title>
            <v-card-text v-for="student in students" v-bind:key="student.id">
                <v-btn 
                  v-on:click="addMember(student.id)"
                  @click.stop="dialog = false" text> {{ student.name }} </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-card-action>
      <v-card-action>
        <v-divider style='margin-left:30px; margin-right:30px'></v-divider>
        <v-row
          align="center"
          justify="center">
          <v-btn
            v-on:click="saveProject()"
            @click="snackbar = true"
            style='margin:10px'
            >Sauvegarder</v-btn>
        </v-row>
        </v-card-action>

      <div v-if="errorMessage == null" class="text-center">
        <v-snackbar
          v-model="snackbar"
          timeout=5000
        >
        Le projet a bien été sauvegardé
        </v-snackbar>
      </div>
      <v-alert style='margin:20px' type='error' v-if="errorMessage !== null"> {{ errorMessage }} </v-alert>
      <v-divider></v-divider>
    </v-card>
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
      dialog: false,
      snackbar: false,
      /** @type {Number} */
      projectManager: null
    };
  },
  async created () {
    /** @type {String} */
    const userType = this.$route.path.split('/')[1];
    this.semesters = userType === 'teacher'
      ? await getSemestersPerTeacher()
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
