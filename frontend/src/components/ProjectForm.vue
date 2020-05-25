<template>
  <div class="ProjectForm">
    <h2>Fiche projet</h2>

    <label for="name"><h2>Nom du projet</h2></label>
    <input
      v-if="editable"
      v-model="currentData.name"
      type="text"
      id="name"
      placeholder="Entrer le nom du projet"
      required
    />
    <span v-else>{{ currentData.name }}</span>

    <h2>Semestre</h2>
    <div v-if="userType === 'admin' || (userType === 'teacher' && editable)">
      <ul v-for="semester in semesters" v-bind:key="semester.name">
        <li>
          <input
            type="radio"
            name="semester"
            v-model="currentData.semesterId"
            :id="'semester' + semester.id"
            :value="semester.id"
            required
            v-on:change="changeSemester()"
          />
          <label :for="'semester' + semester.id">{{ semester.name }}</label>
        </li>
      </ul>
    </div>
    <span v-else-if="semesters.find(s => s.id === currentData.semesterId)">
      Projet de {{ semesters.find(s => s.id === currentData.semesterId).name }}
    </span>

    <label for="slogan"><h2>Slogan</h2></label>
    <input
      v-if="editable"
      v-model="currentData.slogan"
      type="text"
      id="slogan"
      placeholder="Entrer votre slogan"
    />
    <span v-else>{{ currentData.slogan }}</span>

    <label for="describe"><h2>Description</h2></label>
    <textarea
      v-if="editable"
      v-model="currentData.describe"
      id="describe"
      placeholder="Description du projet..."
    ></textarea>
    <p v-else>{{ currentData.describe }}</p>

    <h2>Logo du projet</h2>
    <div>
      <div v-if="!currentData.logo && editable">
        <input type="file" @change="onFileChange" accept="image/png"  id="inputImage" />
      </div>
      <div v-else>
        <img :src="currentData.logo" />
        <button @click="removeImage" v-if="editable">Supprimer l'image</button>
      </div>
      <span v-if="imageError">{{ imageError }}</span>
    </div>

    <h2>Technologie(s) utilisée(s)</h2>
    <ul v-for="technology in technologies" v-bind:key="technology.id">
      <li>
        <input
          v-if="editable"
          v-model="currentData.technologies"
          type="checkbox"
          :value="technology.id"
          :id="'techno' + technology.id"
        />
        <label :for="'techno' + technology.id">{{ technology.name }}</label>
      </li>
    </ul>

    <h2>Membres</h2>
    <ul v-for="student in students" v-bind:key="student.name">
      <li v-if="currentData.membersId.includes(student.id)">
        <span>{{ student.name }}</span>
        <span v-if="currentData.projectManager === student.id">(Chef)</span>
        <button
          v-if="(userType === 'teacher' && editable) || userType === 'admin'"
          v-on:click="removeMember(student.id)"
        >Retirer</button>
        
        <button
          v-if="currentData.projectManager !== student.id"
          v-on:click="currentData.projectManager = student.id"
        >Chef de projet</button>

        <button
          v-if="currentData.projectManager === student.id"
          v-on:click="currentData.projectManager = null"
        >Retirer chef</button>
      </li>
    </ul>

    <div v-if="(userType === 'teacher' && editable) || userType === 'admin'">
      <button v-if="!selectStudent" v-on:click="selectStudent = true">Ajouter un étudiant au projet</button>
      <div v-else>
        <h3>Liste des étudiants</h3>
        <ul v-for="student in students" v-bind:key="student.id">
          <li v-if="!currentData.membersId.includes(student.id)">
            <button v-on:click="addMember(student.id)">{{ student.name }}</button>
          </li>
        </ul>
        <button v-on:click="selectStudent = false">Annuler</button>
      </div>
    </div>

    <button
      v-if="editable || userType === 'admin'"
      v-on:click="submitForm()"
      type="submit"
    >Sauvegarder</button>
    <button v-on:click='generatePDF()'>Générer le PDF</button> 

    <span v-if="errorMessage !== null">{{ errorMessage }}</span>
  </div>
</template>

<script>
import jspdf from 'jspdf';

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
    this.students = await getStudentsPerSemesterNotOnProject(this.currentData.semesterId);
    this.technologies = await getTechnologiesPerSemester(this.currentData.semesterId);
    this.semesters = (this.userType === 'teacher')
      ? await getSemestersPerTeacher(this.$route.params.id)
      : await getAllSemestersName();
  },
  methods: {
    async changeSemester () {
      this.technologies = await getTechnologiesPerSemester(this.currentData.semesterId);
      this.currentData.technologies = this.currentData.technologies.filter(t => this.technologies.find(t2 => t2.id === t) !== undefined);
      this.currentData.membersId = [];
      this.semesters = (this.userType === 'teacher')
        ? await getSemestersPerTeacher(this.$route.params.id)
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
    onFileChange(e) {
      var files = e.target.files;
      if (!files.length) {
        return;
      }
      if (files[0].type !== 'image/png') {
        document.getElementById('inputImage').value = '';
        this.removeImage();
        this.imageError = "L'image doit être au format PNG."; 
        return;
      }
      this.createImage(files[0]);
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
        modifiedData.name = this.currentData.name;
        this.oldData.name = this.currentData.name;
      }
      if (this.oldData.slogan !== this.currentData.slogan) {
        modifiedData.slogan = this.currentData.slogan;
        this.oldData.slogan = this.currentData.slogan;
      }
      if (this.oldData.describe !== this.currentData.describe) {
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
        modifiedData.projectManager = this.currentData.projectManager;
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
    },

    generatePDF() {
      const project = getProjectData(this.projectId);
      const doc = new jspdf();

      doc.fromHTML(project.name,15,15, {
        width:150
      });
      doc.save('Test.pdf');
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
