<template>
  <div class="ProjectForm">
    <h2 class='text-center'>Fiche projet</h2>

    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Nom</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text>
                <v-text-field
                  v-if="editable"
                  v-model.trim="currentData.name"
                  id="name"
                  required
                  label="Nom du projet"
                  dense
                ></v-text-field>

                <span v-else>{{ currentData.name }}</span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Slogan</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text>
                <v-text-field
                  v-if="editable"
                  v-model.trim="currentData.slogan"
                  id="slogan"
                  label="Slogan"
                  dense
                ></v-text-field>

                <span v-else>{{ currentData.slogan }}</span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
            <v-card-title style='background-color:#75b658'>Technologies</v-card-title>
              <v-card-text>
                <v-checkbox
                  :disabled='!editable' 
                  v-for="technology in technologies" v-bind:key="technology.id"
                  v-model='currentData.technologies'
                  :value="technology.id"
                  :label='technology.name'></v-checkbox>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Semestre</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text>
                <v-radio-group 
                v-if="userType === 'admin' || (userType === 'teacher' && editable)" 
                v-model="currentData.semesterId"
                v-on:change="changeSemester()"
                >
                  <v-radio 
                  v-for="semester in semesters" v-bind:key="semester.name" 
                  name="semester" 
                  :label="semester.name" 
                  :value="semester.id"
                  ></v-radio>
                </v-radio-group>

                <span v-else-if="semesters.find(s => s.id === currentData.semesterId)">
                  Projet de {{ semesters.find(s => s.id === currentData.semesterId).name }}
                </span>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Description</v-card-title>
              <v-spacer></v-spacer>
              <v-card-text>
                <v-textarea
                  v-if="editable"
                  v-model.trim="currentData.describe"
                  id="describe"
                  label="Description"
                ></v-textarea>

                <p v-else>{{ currentData.describe }}</p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Logo</v-card-title>
              <v-card-text>
                <v-file-input
                  v-if="!currentData.logo && editable"
                  label="Logo"
                  @change="onFileChange"
                  accept="image/png"  
                  id="inputImage"
                ></v-file-input>

                <div v-else>
                  <div v-if="currentData.logo">
                    <img:src="currentData.logo" alt=""/>
                    <v-alert type='error' v-if="imageError">{{ imageError }}</v-alert>
                    <v-btn @click="removeImage" v-if="editable">Supprimer l'image</v-btn>
                    </div>
                    <v-alert style='margin:10px' v-else type='error'>Aucune image à charger</v-alert>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <v-card class="mx-auto">
              <v-card-title style='background-color:#75b658'>Membres</v-card-title>
              <v-list>
                <v-list-item-group color="primary">
                  <v-list-item :inactive='true' style='cursor:pointer'
                    v-for="student in students.filter(s => currentData.membersId.includes(s.id))" v-bind:key="student.name">

                    <v-list-item-icon v-if="userType === 'admin' || (userType === 'teacher' && editable)">
                      <v-btn
                        v-on:click="currentData.projectManager = student.id" 
                        v-if="currentData.projectManager !== student.id" 
                        text
                      ><v-icon>star</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        v-on:click="currentData.projectManager = null" text
                      ><v-icon color='yellow'>star</v-icon></v-btn>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <div>
                        <v-list-item-title 
                          v-text="student.name"
                        ></v-list-item-title>
                        <h5 v-if="currentData.projectManager === student.id">Chef de projet</h5>
                        <h5 v-else>Membre</h5>
                      </div>
                    </v-list-item-content>
                    <v-list-item-avatar>
                      <v-btn text 
                        v-if="(userType === 'teacher' && editable) || userType === 'admin'"
                        v-on:click="removeMember(student.id)"><v-icon>close</v-icon></v-btn>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list-item-group>
                <div v-if="(userType === 'teacher' && editable) || userType === 'admin'">
                  <v-btn v-if="!selectStudent" @click.stop="dialog = true" style='margin:10px'>Ajouter un membre</v-btn>
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
                </div>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" sm="12">
            <v-btn
              v-if="editable || userType === 'admin'"
              v-on:click="submitForm()"
              @click="snackbar = true"
              >Sauvegarder</v-btn>
          </v-col>

          <v-btn v-on:click="testPDF()">Test PDF</v-btn>

          <router-link :to='"/student/createPDF/" + this.projectId' class='routerlink'>
            <v-col cols="12" sm="12">
              <v-btn
                >Générer PDF</v-btn>
            </v-col>
          </router-link>

          <div class="text-center">
            <v-snackbar
              v-model="snackbar"
              :timeout=timeout
            >
            Le projet a bien été sauvegardé
            </v-snackbar>
          </div>
        </v-row>
      </v-container>
    </v-form>
    <span v-if="errorMessage !== null">{{ errorMessage }}</span>
  </div>
</template>

<script>
import {
  getTechnologiesPerSemester,
  getStudentsPerSemesterNotOnProject,
  getProjectData,
  setModifiedprojectData,
  getSemestersPerTeacher,
  getAllSemestersName
} from '../services/services.js';

export default {
  name: 'ProjectForm',
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    projectId: Number
  },
  data () {
    return {
      snackbar: false,
      timeout: 5000,
      dialog: false,
      selectStudent: false,
      /** @type {{
       *  name: String,
       *  slogan: String,
       *  describe: String,
       *  logo: String,
       *  technologies: Array.<Number>,
       *  membersId: Array.<Number>,
       *  semesterId: id: Number,
       *  projectManager: Number
       * }}
       */
      oldData: null,
      /** @type {{
       *  name: String,
       *  slogan: String,
       *  describe: String,
       *  logo: String,
       *  technologies: Array.<Number>,
       *  membersId: Array.<Number>,
       *  semesterId: id: Number,
       *  projectManager: Number
       * }}
       */
      currentData: {
        name: null,
        slogan: null,
        describe: null,
        logo: null,
        technologies: [],
        membersId: [],
        semesterId: null,
        projectManager: null
      },
      /** @type {String} */
      imageError: null,
      imageMinSize: {
        width: 800,
        height: 800
      },
      /** @type {Array.<{ id: Number, name: String }>} */
      students: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      technologies: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      semesters: [],
      /** @type {String} */
      userType: null,
      /** @type {String} */
      errorMessage: null
    };
  },
  async created () {
    // get user type (admin, teacher or student)
    this.userType = this.$route.path.split('/')[1];
    this.oldData = await getProjectData(Number(this.projectId));
    this.currentData = { ...this.oldData };
    this.currentData.technologies = [ ...this.oldData.technologies ];
    this.currentData.membersId = [ ...this.oldData.membersId ];
    this.students = await getStudentsPerSemesterNotOnProject(this.currentData.semesterId, this.oldData.id);
    this.technologies = await getTechnologiesPerSemester(this.currentData.semesterId);
    this.semesters = (this.userType === 'teacher')
      ? await getSemestersPerTeacher()
      : await getAllSemestersName();
  },

  testPDF () {
    const RenderPDF = require('chrome-headless-render-pdf');
    RenderPDF.generateSinglePdf('http://google.com', 'outputPdf.pdf');
  },
  methods: {
    async changeSemester () {
      this.technologies = await getTechnologiesPerSemester(this.currentData.semesterId);
      this.students = await getStudentsPerSemesterNotOnProject(this.currentData.semesterId, this.oldData.id);
      this.currentData.technologies = this.currentData.technologies.filter(t => this.technologies.find(t2 => t2.id === t) !== undefined);
      this.currentData.membersId = [];
      this.semesters = (this.userType === 'teacher')
        ? await getSemestersPerTeacher()
        : await getAllSemestersName();
      this.currentData.projectManager = null;
    },
    /**
     * Remove member from project members list.
     * @param {Number} memberId
     */
    removeMember (memberId) {
      this.currentData.membersId.splice(this.currentData.membersId.indexOf(memberId), 1);
      if (this.currentData.projectManager === memberId) {
        this.currentData.projectManager = null;
      }
    },
    /**
     * Adding student from project members list.
     * @param {Number} studentId
     */
    addMember (studentId) {
      this.currentData.membersId.push(studentId);
      this.selectStudent = false;
    },
    onFileChange(file) {
      if (file.type !== 'image/png') {
        document.getElementById('inputImage').value = '';
        this.removeImage();
        this.imageError = "L'image doit être au format PNG."; 
        return;
      }
      this.createImage(file);
    },
    createImage(file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();

        img.onload = () => {
          if (img.width < this.imageMinSize.width || img.height < this.imageMinSize.height) {
            document.getElementById('inputImage').value = '';
            this.imageError = `L'image doit avoir un format minimum de ${this.imageMinSize.width} x ${this.imageMinSize.height}.`;
            this.removeImage();
          } else {
            this.currentData.logo = e.target.result;
            this.imageError = null;
          }
        };
        img.src = e.target.result;
        
      };
      reader.readAsDataURL(file);
    },
    removeImage () {
      this.currentData.logo = '';
    },
    submitForm() {
      if (this.currentData.membersId.length === 0) {
        this.errorMessage = 'Il doit y avoir au moins un membre dans le projet.';
        return;
      }
      const modifiedData = { projectId: Number(this.projectId) };
      if (this.oldData.name !== this.currentData.name) {
        if (!this.currentData.name) {
          this.errorMessage = 'Le nom du projet ne doit pas être laissé vide.';
          return;
        }
        modifiedData.name = this.currentData.name;
        this.oldData.name = this.currentData.name;
      }
      if (this.oldData.slogan !== this.currentData.slogan) {
        if (!this.currentData.slogan) {
          this.errorMessage = 'Le slogant ne doit pas être laissé vide.';
          return;
        }
        modifiedData.slogan = this.currentData.slogan;
        this.oldData.slogan = this.currentData.slogan;
      }
      if (this.oldData.describe !== this.currentData.describe) {
        if (!this.currentData.describe) {
          this.errorMessage = 'La description ne doit pas être laissée vide.';
          return;
        }
        modifiedData.describe = this.currentData.describe;
        this.oldData.describe = this.currentData.describe;
      }
      if (this.oldData.logo !== this.currentData.logo) {
        modifiedData.logo = this.currentData.logo;
        this.oldData.logo = this.currentData.logo;
      }
      if (this.oldData.semesterId !== this.currentData.semesterId) {
        modifiedData.semesterId = this.currentData.semesterId;
        this.oldData.semesterId = this.currentData.semesterId;
      }
      if (this.oldData.projectManager !== this.currentData.projectManager) {
        modifiedData.projectManager = { old: this.oldData.projectManager, new: this.currentData.projectManager };
        this.oldData.projectManager = this.currentData.projectManager;
      }
      let update = this.getUpdatedElement(this.oldData.technologies, this.currentData.technologies);
      if (update.length > 0) {
        modifiedData.technologies = update;
        this.oldData.technologies = [ ...this.currentData.technologies ];
      }
      update = this.getUpdatedElement(this.oldData.membersId, this.currentData.membersId);
      if (update.length > 0) {
        modifiedData.membersId = update;
        this.oldData.membersId = [ ...this.currentData.membersId ];
      }
      if (Object.keys(modifiedData).length > 1) {
        setModifiedprojectData(modifiedData);
        this.errorMessage = null;
      }
    },
    /**
     * Get list with the deleted or added element from the currentList.
     * If an element was added, his add is `true`,
     * else if his deleted, his add is `false`.
     * @param {Array.<Number>} oldList
     * @param {Array.<Number>} currentList
     * @returns {Array.<{ id: Number, add: Boolean }>}
     */
    getUpdatedElement (oldList, currentList) {
      const updateList = [];
      let copyModifiedItem = [ ...currentList ];
      oldList.forEach(item => {
        if (copyModifiedItem.find(item2 => item2 === item) === undefined) {
          updateList.push({ id: item, add: false });
        } else {
          copyModifiedItem = copyModifiedItem.filter(item2 => item2 !== item);
        }
      });
      copyModifiedItem.forEach(item => updateList.push({ id: item, add: true }));
      return updateList;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>