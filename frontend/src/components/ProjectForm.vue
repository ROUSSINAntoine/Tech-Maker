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
            v-model="currentData.semesterId"
            :id="'semester' + semester.id"
            :value="semester.id"
            required
            onchange="changeSemester()"
          />
          <label :for="'semester' + semester.id">{{ semester.name }}</label>
        </li>
      </ul>
    </div>
    <span v-else>Projet de {{ currentData.semester.name }}</span>

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
        <button v-if="(userType === 'Teacher' && editable) || userType === 'admin'" v-on:click="removeMember(student.id)">Retirer</button>
      </li>
    </ul>

    <div v-if="(userType === 'Teacher' && editable) || userType === 'admin'">
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
  </div>
</template>

<script>
import {
  getTechnologiesPerSemester,
  getStudentsPerSemester,
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
       *  semesterId: id: Number
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
       *  semesterId: id: Number
       * }}
       */
      currentData: {
        name: null,
        slogan: null,
        describe: null,
        logo: null,
        technologies: [],
        membersId: [],
        semester: {
          id: null,
          name: null
        }
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
      projects: [],
      /** @type {Array.<{ id: Number, name: String }>} */
      semesters: [],
      /** @type {String} */
      userType: null
    };
  },
  async created () {
    // get user type (admin, teacher or student)
    this.userType = this.$route.path.split('/')[1];
    this.oldData = await getProjectData(this.projectId);
    this.currentData = { ...this.oldData };
    this.currentData.technologies = [ ...this.oldData.technologies ];
    this.currentData.membersId = [ ...this.oldData.membersId ];

    this.students = await getStudentsPerSemester(this.currentData.semester.id);
    this.technologies = await getTechnologiesPerSemester(this.currentData.semester.id);
    this.semesters = this.userType === 'admin'
      ? await getAllSemestersName()
      : this.userType === 'teacher'
        ? await getSemestersPerTeacher(this.$route.params.id)
        : [];
  },
  methods: {
    async changeSemester () {
      this.technologies = await getTechnologiesPerSemester(this.currentData.semesterId);
      this.currentData.technologies = this.currentData.technologies.filter(t => this.technologies.find(t2 => t2.id === t) !== undefined);
    },
    /**
     * Remove member from project members list.
     * @param {Number} memberId
     */
    removeMember (memberId) {
      this.currentData.membersId.splice(this.currentData.membersId.indexOf(memberId), 1);
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
      const modifiedData = { projectId: this.projectId };
      if (this.oldData.name !== this.currentData.name) {
        modifiedData.name = this.currentData.name;
      }
      if (this.oldData.slogan !== this.currentData.slogan) {
        modifiedData.slogan = this.currentData.slogan;
      }
      if (this.oldData.describe !== this.currentData.describe) {
        modifiedData.describe = this.currentData.describe;
      }
      if (this.oldData.logo !== this.currentData.logo) {
        modifiedData.logo = this.currentData.logo;
      }
      if (this.oldData.semesterId !== this.currentData.semesterId) {
        modifiedData.semesterId = this.currentData.semesterId;
      }
      let update = this.getUpdatedElement(this.oldData.technologies, this.currentData.technologies);
      if (update.length > 0) {
        modifiedData.technologies = update;
      }
      update = this.getUpdatedElement(this.oldData.membersId, this.currentData.membersId);
      if (update.length > 0) {
        modifiedData.membersId = update;
      }
      if (Object.keys(modifiedData).length > 1) {
        setModifiedprojectData(modifiedData);
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
